import { Component, OnDestroy, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  L10N_CONFIG,
  L10nConfig,
  L10N_LOCALE,
  L10nLocale,
  L10nTranslationService,
} from 'angular-l10n';
import { L10nSchema } from 'angular-l10n/lib/models/types';
import { NavigationEnd, Router } from '@angular/router';
import { startSearchState } from 'src/app/store/actions/search.actions';
import { logOut, updateAuthStateFromLocalStorage } from '../../../store/actions/auth.actions';
import { getUserId } from '../../../store/selectors/auth.selectors';
import { getLoadStatus, getMessage } from '../../../store/selectors/notifications.selectors';
import { setMessage } from '../../../store/actions/notifications.actions';
import { NotificationSnackBarComponent } from '../../../shared/components/notification-snack-bar/notification-snack-bar.component';
import { Languages } from '../../constants/l10n-config';
import { i18nAsset } from '../../constants/i18n';

const SNACK_BAR_TIME_DELAY_MS = 1500;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;

  isLoad = false;

  isBoardsRoute = false;

  isSearchRoute = false;

  userId = '';

  lang: string | null = this.translation.getLocale().language.toUpperCase();

  schema: L10nSchema[] = this.l10nConfig.schema;

  EN = this.schema[0].locale;

  RU = this.schema[1].locale;

  @ViewChild('langs') langs!: ElementRef;

  @ViewChild('searchInput') searchValue!: ElementRef;

  subscription = new Subscription();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    private translation: L10nTranslationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store.dispatch(updateAuthStateFromLocalStorage());

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = event;
        if (url !== '/boards') {
          this.isBoardsRoute = false;
        } else {
          this.isBoardsRoute = true;
        }
        if (url === '/boards/search') {
          this.isSearchRoute = true;
        } else {
          this.isSearchRoute = false;
        }
      }
    });

    const subUserId = this.store.select(getUserId).subscribe((id) => {
      this.isLogged = !!id;
      if (id) {
        this.userId = id;
      }
    });
    this.subscription.add(subUserId);

    const subMsg = this.store.select(getMessage).subscribe((msg) => {
      if (msg) {
        this.snackBar.openFromComponent(NotificationSnackBarComponent, {
          data: msg,
          duration: SNACK_BAR_TIME_DELAY_MS,
        });
        this.store.dispatch(setMessage({ msg: null }));
      }
    });
    this.subscription.add(subMsg);

    const subLoad = this.store.select(getLoadStatus).subscribe((status) => {
      this.isLoad = status;
    });
    this.subscription.add(subLoad);

    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
      if (this.lang === Languages.english) this.translation.setLocale(this.EN);
      if (this.lang === Languages.russian) this.translation.setLocale(this.RU);
    } else {
      localStorage.setItem('lang', this.lang!);
    }

    this.translation.addProviders([{ name: 'lazy', asset: i18nAsset }]);
    this.translation.loadTranslation([{ name: 'lazy', asset: i18nAsset }]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.isLogged = false;
    this.store.dispatch(logOut());
  }

  setLocale(): void {
    if (this.langs.nativeElement.value === Languages.english) {
      this.translation.setLocale(this.EN);
      this.lang = Languages.english;
    }
    if (this.langs.nativeElement.value === Languages.russian) {
      this.translation.setLocale(this.RU);
      this.lang = Languages.russian;
    }
    localStorage.setItem('lang', this.lang!);
  }

  search() {
    this.store.dispatch(
      startSearchState({ userId: this.userId, value: this.searchValue.nativeElement.value }),
    );
  }
}
