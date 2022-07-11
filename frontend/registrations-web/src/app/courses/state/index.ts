import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { DateTime } from 'luxon';
import { getSelectors } from '@ngrx/router-store';
import {
  CourseListItemModel,
  CreateRegistrationModel,
  OfferingsListItemModel,
  OfferingsListModel,
} from '../models';

import * as fromCourses from './reducers/courses.reducer';
import * as fromReferences from './reducers/references.reducer';
import * as fromOfferings from './reducers/offerings.reducer';
import * as fromRegistrationRequests from './reducers/registration-requests.reducer';
import * as fromErrors from './reducers/error.reducer';

import { selectLoggedInUser } from 'src/app/users/state';
export const featureName = 'Courses Feature';

export interface CoursesState {
  courses: fromCourses.CoursesState;
  references: fromReferences.ReferencesState;
  offerings: fromOfferings.OfferingsState;
  registrationRequests: fromRegistrationRequests.RegiestrationRequestsState;
  errors: fromErrors.ErrorState;
}

export const reducers: ActionReducerMap<CoursesState> = {
  courses: fromCourses.reducer,
  references: fromReferences.reducer,
  offerings: fromOfferings.reducer,
  registrationRequests: fromRegistrationRequests.reducer,
  errors: fromErrors.reducer,
};

const selectFeature = createFeatureSelector<CoursesState>(featureName);

const { selectRouteParams } = getSelectors();

const selectCourseBranch = createSelector(selectFeature, (f) => f.courses);
const selectReferencesBranch = createSelector(
  selectFeature,
  (f) => f.references
);

const selectErrorsBranch = createSelector(selectFeature, (f) => f.errors);

const selectRegistrationsRequestBranch = createSelector(
  selectFeature,
  (f) => f.registrationRequests
);

const selectOfferingsBranch = createSelector(selectFeature, (f) => f.offerings);

const { selectAll: selectCourseEntityArray } =
  fromCourses.adapter.getSelectors(selectCourseBranch);

const { selectAll: selectOfferingsEntityArray } =
  fromOfferings.adapter.getSelectors(selectOfferingsBranch);

const selectCourseRouteParam = createSelector(selectRouteParams, (params) => {
  return params['id'] as string | undefined;
});
const selectOfferingRouteParam = createSelector(
  selectRouteParams,
  (params) => params['offeringid'] as string | undefined
);
const selectCourses = createSelector(selectCourseEntityArray, (courses) => {
  return courses;
});

export const selectCourseList = createSelector(
  selectCourses,
  selectOfferingsEntityArray,
  (courses, offerings) => {
    return courses.map((course) => {
      return {
        ...course,
        hasOfferings: offerings.some(
          (offering) => offering.course === course.id
        ),
      } as CourseListItemModel;
    }) as CourseListItemModel[];
  }
);

export const selectOfferingsForCourse = createSelector(
  selectCourseRouteParam,
  selectOfferingsEntityArray,
  selectCourseList,
  (courseId, offerings, courses) => {
    const isCourse = courses.some((c) => c.id === courseId);
    if (!isCourse) {
      return {
        courseId: courseId,
        hasCourse: false,
      } as OfferingsListModel;
    } else {
      const theCourse = courses.find((course) => course.id === courseId);
      return {
        courseId: courseId,
        hasCourse: true,
        courseInfo: courses.find((c) => c.id === courseId),
        offerings: offerings
          .filter((o) => o.course === courseId)
          .map((o) => {
            return {
              ...o,
              endDate: DateTime.fromJSDate(o.startDate)
                .plus({ days: theCourse!.numberOfDays - 1 })
                .toJSDate(),
            } as OfferingsListItemModel;
          }),
      } as OfferingsListModel;
    }
  }
);

export const selectCoursesNeedLoaded = createSelector(
  selectReferencesBranch,
  fromReferences.selectors.selectCoursesNeedLoaded
);
export const selectOfferingsNeedLoaded = createSelector(
  selectReferencesBranch,
  fromReferences.selectors.selectOfferingsNeedLoaded
);

export const selectRegistrationModel = createSelector(
  selectLoggedInUser,
  selectOfferingRouteParam,
  selectCourseList,
  selectOfferingsEntityArray,
  (user, offeringId, courses, offerings) => {
    const hasOffering = offerings.some((o) => o.id === offeringId);
    if (!hasOffering) {
      return {
        hasOffering: false,
      } as CreateRegistrationModel;
    } else {
      return {
        hasOffering: true,
        studentName: user?.given_name + ' ' + user?.family_name,
        studentEmail: user?.email,
        offering: offerings.find((o) => o.id === offeringId),
        course: courses.find(
          (c) => c.id === offerings.find((o) => o.id === offeringId)?.course
        ),
      } as CreateRegistrationModel;
    }
  }
);

export const selectCoursesApiHasError = createSelector(
  selectErrorsBranch,
  (b) => b.courseLoadError
);
