import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logOut, updateAuthStateFromLocalStorage } from '../../../store/actions/auth.actions';
import { getUserId } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;

  subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(updateAuthStateFromLocalStorage());

    const subUserId = this.store.select(getUserId).subscribe((id) => {
      if (id) {
        this.isLogged = true;
      }
    });
    this.subscription.add(subUserId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.isLogged = false;
    this.store.dispatch(logOut());
  }
}
