import { createReducer, on } from '@ngrx/store';
import { authDocuments } from '../actions/auth.actions';

export interface User {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
export interface UserState {
  user: User | null;
}

const initialState: UserState = { user: null };

export const reducer = createReducer(
  initialState,
  on(authDocuments.user, (s, a) => ({ ...s, user: a.user }))
);
