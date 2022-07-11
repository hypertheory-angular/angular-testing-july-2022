import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  coursesCommands,
  courseDocuments,
  courseEvents,
} from '../actions/courses.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseEntity } from '../reducers/courses.reducer';
@Injectable()
export class CourseDataEffects {
  private readonly url = environment.referencesApiUrl + 'courses';
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(coursesCommands.loadcourses),
      switchMap(() =>
        this.client.get<{ data: CourseEntity[] }>(this.url).pipe(
          map(({ data }) => {
            return courseDocuments.courses({ courses: data });
          }),
          catchError(() => of(courseEvents.courseloadfailed()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}
