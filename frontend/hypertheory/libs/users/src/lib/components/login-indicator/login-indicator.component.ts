import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoggedInUser, selectUserLoggedIn } from '../../state';
import { User } from '../../state/reducers/user.reducer';
import { authEvents } from '../../state/actions/auth.actions';

@Component({
  selector: 'app-login-indicator',
  templateUrl: './login-indicator.component.html',
  styleUrls: ['./login-indicator.component.css'],
})
export class LoginIndicatorComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  user$!: Observable<User | undefined | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectUserLoggedIn);
    this.user$ = this.store.select(selectLoggedInUser);
  }

  login() {
    this.store.dispatch(authEvents.loginrequested());
  }

  logout() {
    this.store.dispatch(authEvents.logoutrequested());
  }
}
