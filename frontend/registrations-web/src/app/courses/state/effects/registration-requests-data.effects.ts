import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationRequestCreateModel } from '../../models';
import {
  registrationRequestsCommands,
  registrationRequestsDocuments,
} from '../actions/registration-requests.actions';
import { RegistrationRequestEntity } from '../reducers/registration-requests.reducer';
@Injectable()
export class RegistrationRequestsDataEffects {
  sendRegistrationRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registrationRequestsCommands.send),
      map(({ payload }) => mapMessageToPayload(payload)),
      mergeMap(([url, msg]) =>
        this.client
          .post<RegistrationRequestEntity>(url, msg)
          .pipe(
            map((payload) => registrationRequestsDocuments.request({ payload }))
          )
      )
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}

type RegistrationRequestRequestData = Omit<
  RegistrationRequestCreateModel,
  'courseOffering'
>;

function mapMessageToPayload(
  message: RegistrationRequestCreateModel
): [url: string, payload: RegistrationRequestRequestData] {
  const { courseOffering } = message;
  const url =
    environment.bffApiUrl +
    'offerings/' +
    courseOffering +
    '/registration-requests';
  const payload = {
    ...message,
    courseOffering: undefined,
  };
  return [url, payload];
}
