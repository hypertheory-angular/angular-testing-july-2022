import { createActionGroup, props } from '@ngrx/store';
import { RegistrationRequestCreateModel } from '../../models';
import { RegistrationRequestEntity } from '../reducers/registration-requests.reducer';

export const registrationRequestsCommands = createActionGroup({
  source: 'Registration Requests Commands',
  events: {
    send: props<{
      payload: RegistrationRequestCreateModel;
    }>(),
  },
});

export const registrationRequestsEvents = createActionGroup({
  source: 'Registration Requests Events',
  events: {
    registrationRequested: props<{ payload: RegistrationRequestCreateModel }>(),
  },
});

export const registrationRequestsDocuments = createActionGroup({
  source: 'Registration Requests Documents',
  events: {
    request: props<{ payload: RegistrationRequestEntity }>(),
  },
});
