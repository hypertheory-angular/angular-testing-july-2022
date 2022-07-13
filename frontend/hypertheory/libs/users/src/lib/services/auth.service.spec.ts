import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './auth.service';
import '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { authDocuments } from '../state/actions/auth.actions';
describe('Auth Service', () => {
  describe('Auth Service when a User Logs in', () => {
    const response: Pick<LoginResponse, 'isAuthenticated' | 'userData'> = {
      userData: { id: '2', name: 'bob' },
      isAuthenticated: true,
    };
    let spectator: SpectatorService<AuthService>;
    // setup has to go here
    const createService = createServiceFactory({
      service: AuthService,
      providers: [
        mockProvider(OidcSecurityService, {
          checkAuth: () => of(response),
        }),
      ],
      mocks: [Store],
    });

    it('should create', () => {
      spectator = createService();
      expect(spectator.service).toBeTruthy();
    });

    it('dispatches the auth document with the user data', () => {
      // "inject" isn't a verb here so much as saying "get me the instance of this service you are using in this scenario"
      const store = spectator.inject(Store);
      jest.spyOn(store, 'dispatch');
      spectator = createService();
      const expectedAction = authDocuments.user({ user: response.userData });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('Auth Service when a User Logs Out', () => {
    const response: Pick<LoginResponse, 'isAuthenticated' | 'userData'> = {
      userData: null,
      isAuthenticated: false,
    };
    let spectator: SpectatorService<AuthService>;
    // setup has to go here
    const createService = createServiceFactory({
      service: AuthService,
      providers: [
        mockProvider(OidcSecurityService, {
          checkAuth: () => of(response),
        }),
      ],
      mocks: [Store],
    });

    it('should create', () => {
      spectator = createService();
      expect(spectator.service).toBeTruthy();
    });

    it('dispatches the auth document with the user data', () => {
      // "inject" isn't a verb here so much as saying "get me the instance of this service you are using in this scenario"
      const store = spectator.inject(Store);
      jest.spyOn(store, 'dispatch');
      spectator = createService();
      const expectedAction = authDocuments.user({ user: null });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
