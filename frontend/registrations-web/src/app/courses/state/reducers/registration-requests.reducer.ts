import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';

export interface RegistrationRequestEntity {}

export interface RegiestrationRequestsState
  extends EntityState<RegistrationRequestEntity> {}

export const adapter = createEntityAdapter<RegistrationRequestEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(initialState);
