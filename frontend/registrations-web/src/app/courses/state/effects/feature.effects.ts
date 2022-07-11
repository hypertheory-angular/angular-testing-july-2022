import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { filter, map, tap } from 'rxjs';

import { featureEvents } from '../actions/feature.actions';
@Injectable()
export class FeatureEffects {
  loadCourses$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerNavigationAction),
        filter(
          ({
            payload: {
              routerState: { url },
            },
          }) => url.startsWith('/courses')
        ),
        map(() => featureEvents.entered())
      );
    },
    { dispatch: true }
  );
  constructor(private actions$: Actions) {}
}
