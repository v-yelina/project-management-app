import { Component, OnDestroy, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  L10N_CONFIG,
  L10nConfig,
  L10N_LOCALE,
  L10nLocale,
  L10nTranslationService,
} from 'angular-l10n';
import { L10nSchema } from 'angular-l10n/lib/models/types';
import { logOut, updateAuthStateFromLocalStorage } from '../../../store/actions/auth.actions';
import { getUserId } from '../../../store/selectors/auth.selectors';
import { Languages } from '../../constants/l10n-config';
import { i18nAsset } from '../../constants/i18n';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;

  lang: string | null = this.translation.getLocale().language.toUpperCase();

  schema: L10nSchema[] = this.l10nConfig.schema;

  EN = this.schema[0].locale;

  RU = this.schema[1].locale;

  @ViewChild('langs') langs!: ElementRef;

  subscription = new Subscription();

  constructor(
    private store: Store,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
    private translation: L10nTranslationService,
  ) {}

  ngOnInit() {
    this.store.dispatch(updateAuthStateFromLocalStorage());

    const subUserId = this.store.select(getUserId).subscribe((id) => {
      if (id) {
        this.isLogged = true;
      }
    });
    this.subscription.add(subUserId);
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
      if (this.lang === Languages.english) this.translation.setLocale(this.EN);
      if (this.lang === Languages.russian) this.translation.setLocale(this.RU);
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
}
