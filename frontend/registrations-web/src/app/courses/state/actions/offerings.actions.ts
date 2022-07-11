import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OfferingEntity } from '../reducers/offerings.reducer';

export const offeringsCommands = createActionGroup({
  source: 'Offerings Commands',
  events: {
    loadOfferings: emptyProps(),
  },
});

export const offeringsEvents = createActionGroup({
  source: 'Offerings Events',
  events: {},
});

export const offeringDocuments = createActionGroup({
  source: 'Offering Documents',
  events: {
    offerings: props<{ offerings: OfferingEntity[] }>(),
    offering: props<{ offering: OfferingEntity }>(),
  },
});
