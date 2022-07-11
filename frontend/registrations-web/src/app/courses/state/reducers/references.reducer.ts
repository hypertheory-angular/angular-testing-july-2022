import { createReducer, on } from '@ngrx/store';
import { courseDocuments } from '../actions/courses.actions';
import { offeringDocuments } from '../actions/offerings.actions';

export interface ReferencesState {
  coursesNeedLoaded: boolean;
  offeringsNeedLoaded: boolean;
}

const initialState: ReferencesState = {
  coursesNeedLoaded: true,
  offeringsNeedLoaded: true,
};

export const reducer = createReducer(
  initialState,
  on(courseDocuments.courses, (state) => ({
    ...state,
    coursesNeedLoaded: false,
  })),
  on(offeringDocuments.offerings, (state) => ({
    ...state,
    offeringsNeedLoaded: false,
  }))
);

const selectCoursesNeedLoaded = (state: ReferencesState) =>
  state.coursesNeedLoaded;
const selectOfferingsNeedLoaded = (state: ReferencesState) =>
  state.offeringsNeedLoaded;
export const selectors = {
  selectCoursesNeedLoaded,
  selectOfferingsNeedLoaded,
};
