import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { selectOfferingsNeedLoaded } from '..';
import { featureEvents } from '../actions/feature.actions';
import { offeringsCommands } from '../actions/offerings.actions';

@Injectable()
export class OfferingsEventHandlingEffects {
  loadOfferingsOnFeatureEntered$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(featureEvents.entered),
      concatLatestFrom(() => this.store.select(selectOfferingsNeedLoaded)),
      filter(([, offeringsNeedLoaded]) => offeringsNeedLoaded),
      map(() => offeringsCommands.loadofferings())
    );
  });
  constructor(private actions$: Actions, private store: Store) {}
}
