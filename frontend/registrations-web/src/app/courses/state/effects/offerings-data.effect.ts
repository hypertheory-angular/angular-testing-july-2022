import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import {
  offeringsCommands,
  offeringDocuments,
} from '../actions/offerings.actions';
import { OfferingEntity } from '../reducers/offerings.reducer';
import { environment } from 'src/environments/environment';
@Injectable()
export class OfferingsDataEffects {
  private readonly url = environment.referencesApiUrl + 'offerings';
  loadOfferings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(offeringsCommands.loadofferings),
      switchMap(() =>
        this.client.get<{ data: OfferingEntity[] }>(this.url).pipe(
          map(({ data }) => data),
          map(mapToOfferings),
          map((offerings) => offeringDocuments.offerings({ offerings }))
        )
      )
    );
  });
  constructor(private actions$: Actions, private client: HttpClient) {}
}

function mapToOfferings(offerings: OfferingEntity[]): OfferingEntity[] {
  return offerings.map((o) => ({ ...o, startDate: new Date(o.startDate) }));
}
