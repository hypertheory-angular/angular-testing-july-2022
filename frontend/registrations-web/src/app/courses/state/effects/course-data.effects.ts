import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { coursesCommands, courseDocuments } from '../actions/courses.actions';
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
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private client: HttpClient) {}
}
