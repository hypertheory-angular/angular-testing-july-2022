import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
export const featureName = 'Users Feature';

export interface UsersFeatureState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<UsersFeatureState> = {
  user: fromUser.reducer,
};

const selectFeature = createFeatureSelector<UsersFeatureState>(featureName);

const selectUserBranch = createSelector(selectFeature, (f) => f.user);

export const selectUserLoggedIn = createSelector(
  selectUserBranch,
  (f) => f.user !== null
);

export const selectLoggedInUser = createSelector(
  selectUserLoggedIn,
  selectUserBranch,
  (loggedIn, creds) => {
    if (loggedIn) {
      return creds.user;
    } else {
      return undefined;
    }
  }
);
