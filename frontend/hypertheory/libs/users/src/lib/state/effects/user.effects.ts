import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { authEvents } from '../actions/auth.actions';
@Injectable()
export class UserEffects {
  logIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authEvents.loginrequested),
        tap(() => this.authService.login())
      );
    },
    { dispatch: false }
  );

  logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authEvents.logoutrequested),
        tap(() => this.authService.logout())
      );
    },
    { dispatch: false }
  );
  constructor(private authService: AuthService, private actions$: Actions) {}
}
