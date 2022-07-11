import { FormControl } from '@angular/forms';
import { CourseEntity } from '../state/reducers/courses.reducer';
import { OfferingEntity } from '../state/reducers/offerings.reducer';

export type CourseListItemModel = Readonly<CourseEntity> & {
  hasOfferings: boolean;
};

export interface OfferingsListModel {
  courseId: string;
  hasCourse: boolean;
  courseInfo?: CourseListItemModel;
  offerings?: OfferingsListItemModel[];
}

export type OfferingsListItemModel = Readonly<OfferingEntity> & {
  endDate: Date;
};

export interface CreateRegistrationModel {
  hasOffering: boolean;
  studentName?: string;
  studentEmail?: string;
  offering?: Readonly<OfferingEntity>;
  course?: CourseListItemModel;
}

export type RegistrationRequestCreateModel = {
  agreesToParticipate: boolean;
  agreesToPay: boolean;
  comments: string;
  courseOffering: string;
  amount: number;
};

export type FormModel<Type> = {
  [Property in keyof Type]: FormControl<Type[Property]>;
};
