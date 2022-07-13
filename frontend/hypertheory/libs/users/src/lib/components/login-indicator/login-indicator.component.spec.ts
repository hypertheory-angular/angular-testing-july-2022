import { LoginIndicatorComponent } from './login-indicator.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import '@ngneat/spectator/jest';
import { selectLoggedInUser, selectUserLoggedIn } from '../../state';
import { Store } from '@ngrx/store';
import { authEvents } from '../../state/actions/auth.actions';
import { User } from '../../state/reducers/user.reducer';
describe('The Login Indicator Component', () => {
  describe('Login Indicator when the User is Not Logged In', () => {
    const mockStore = provideMockStore({
      selectors: [
        {
          selector: selectUserLoggedIn,
          value: false,
        },
        {
          selector: selectLoggedInUser,
          value: undefined,
        },
      ],
    });
    let spectator: Spectator<LoginIndicatorComponent>;

    const createComponent = createComponentFactory({
      component: LoginIndicatorComponent,
      providers: [mockStore],
    });
    beforeEach(() => (spectator = createComponent()));
    it('should be able to create the component', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('`should show the login indicator`', () => {
      expect('[data-test="login-indicator-logged-out"]').toExist();
      expect('[data-test="login-indicator-logged-in"]').not.toExist();
    });
    it('should allow the user to log in', () => {
      expect('[data-test="login-indicator-logged-out"] button').toExist();
      const ms = spectator.inject<Store>(Store);
      jest.spyOn(ms, 'dispatch');
      spectator.click('[data-test="login-indicator-logged-out"] button');

      expect(ms.dispatch).toHaveBeenCalledTimes(1);
      const expectedAction = authEvents.loginrequested();
      expect(ms.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe('Login Indicator when the User is Is Logged In', () => {
    const mockStore = provideMockStore({
      selectors: [
        {
          selector: selectUserLoggedIn,
          value: true,
        },
        {
          selector: selectLoggedInUser,
          value: {
            preferred_username: 'bob@aol.com',
            sub: '42',
          } as Pick<User, 'preferred_username' | 'sub'>,
        },
      ],
    });
    let spectator: Spectator<LoginIndicatorComponent>;

    const createComponent = createComponentFactory({
      component: LoginIndicatorComponent,
      providers: [mockStore],
    });
    beforeEach(() => (spectator = createComponent()));
    it('should be able to create the component', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('`should show the logout indicator`', () => {
      expect('[data-test="login-indicator-logged-out"]').not.toExist();
      expect('[data-test="login-indicator-logged-in"]').toExist();
    });
    it('should allow the user to log out', () => {
      expect('[data-test="login-indicator-logged-in"] button').toExist();
      const ms = spectator.inject<Store>(Store);
      jest.spyOn(ms, 'dispatch');
      spectator.click('[data-test="login-indicator-logged-in"] button');

      expect(ms.dispatch).toHaveBeenCalledTimes(1);
      const expectedAction = authEvents.logoutrequested();
      expect(ms.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
