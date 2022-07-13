import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authEvents = createActionGroup({
  source: 'Auth',
  events: {
    logInRequested: emptyProps(),
    logOutRequested: emptyProps(),
  },
});

export const authDocuments = createActionGroup({
  source: 'Auth Documents',
  events: {
    user: props<{ user: any | null }>(),
  },
});
