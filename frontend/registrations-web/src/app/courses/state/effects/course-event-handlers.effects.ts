import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { featureEvents } from '../actions/feature.actions';
import { coursesCommands } from '../actions/courses.actions';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCoursesNeedLoaded } from '..';

@Injectable()
export class CourseEventHandlersEffects {
  loadCoursesOnFeatureEntered$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(featureEvents.entered),
      concatLatestFrom(() => this.store.select(selectCoursesNeedLoaded)),
      filter(([, coursesNeedLoaded]) => coursesNeedLoaded),
      map(() => coursesCommands.loadcourses())
    );
  });
  constructor(private actions$: Actions, private store: Store) {}
}
