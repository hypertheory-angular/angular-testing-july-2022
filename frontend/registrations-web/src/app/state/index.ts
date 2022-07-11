import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
export interface AppState {
  router: RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
