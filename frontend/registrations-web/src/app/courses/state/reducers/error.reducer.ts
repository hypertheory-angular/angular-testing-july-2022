import { createReducer, on } from '@ngrx/store';
import { courseEvents } from '../actions/courses.actions';

export interface ErrorState {
  courseLoadError: boolean;
}

const initialState: ErrorState = {
  courseLoadError: false,
};

export const reducer = createReducer(
  initialState,
  on(courseEvents.courseloadfailed, (s) => ({ ...s, courseLoadError: true }))
);
