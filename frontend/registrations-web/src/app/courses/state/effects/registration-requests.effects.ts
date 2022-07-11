import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import {
  registrationRequestsEvents,
  registrationRequestsCommands,
} from '../actions/registration-requests.actions';

@Injectable()
export class RegistrationRequestsEffects {
  sendRegistrationRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registrationRequestsEvents.registrationrequested),
      map(({ payload }) => registrationRequestsCommands.send({ payload }))
    )
  );
  constructor(private actions$: Actions) {}
}
