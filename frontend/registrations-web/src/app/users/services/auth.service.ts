import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, map } from 'rxjs';
import { authDocuments } from '../state/actions/auth.actions';
@Injectable()
export class AuthService {
  constructor(private oidcService: OidcSecurityService, private store: Store) {
    oidcService
      .checkAuth()
      .pipe(
        map(({ isAuthenticated, userData }) => {
          if (isAuthenticated) {
            this.store.dispatch(authDocuments.user({ user: userData }));
          } else {
            this.store.dispatch(authDocuments.user({ user: null }));
          }
        })
      )

      .subscribe();
  }

  login() {
    this.oidcService.authorize();
  }

  logout() {
    this.oidcService.logoff();
  }
}
