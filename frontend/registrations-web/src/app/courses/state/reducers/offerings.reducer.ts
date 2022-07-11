import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { offeringDocuments } from '../actions/offerings.actions';
export interface OfferingEntity {
  id: string;
  revision: number;
  course: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  deliveryMethod: string;
  hasSeatsAvailable: boolean;
}

export interface OfferingsState extends EntityState<OfferingEntity> {}

export const adapter = createEntityAdapter<OfferingEntity>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(offeringDocuments.offerings, (state, action) =>
    adapter.setAll(action.offerings, state)
  )
);
