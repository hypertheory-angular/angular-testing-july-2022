import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CourseEntity } from '../reducers/courses.reducer';

export const coursesCommands = createActionGroup({
  source: 'Courses Commands',
  events: {
    loadCourses: emptyProps(),
  },
});

export const courseEvents = createActionGroup({
  source: 'Course Events',
  events: {
    courseLoadFailed: emptyProps(),
  },
});

export const courseDocuments = createActionGroup({
  source: 'Course Documents',
  events: {
    courses: props<{ courses: CourseEntity[] }>(),
    course: props<{ course: CourseEntity }>(),
  },
});
