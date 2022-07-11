import { createActionGroup, emptyProps } from '@ngrx/store';

export const featureEvents = createActionGroup({
  source: 'Feature Events',
  events: {
    entered: emptyProps(),
  },
});
