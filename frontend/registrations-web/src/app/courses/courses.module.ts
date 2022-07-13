import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { OfferingComponent } from './components/offering/offering.component';
// import { UiLibModule } from '../ui-lib/ui-lib.module';
import { UiLibModule } from '@hypertheory/ui-lib';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { RegisterComponent } from './components/enrollments/register/register.component';
import {
  AuthInterceptor,
  AutoLoginAllRoutesGuard,
} from 'angular-auth-oidc-client';
import { EffectsModule } from '@ngrx/effects';
import { FeatureEffects } from './state/effects/feature.effects';
import { CourseEventHandlersEffects } from './state/effects/course-event-handlers.effects';
import { CourseDataEffects } from './state/effects/course-data.effects';
import { OfferingsEventHandlingEffects } from './state/effects/offerings-event-handler.effects';
import { OfferingsDataEffects } from './state/effects/offerings-data.effect';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRequestsEffects } from './state/effects/registration-requests.effects';
import { RegistrationRequestsDataEffects } from './state/effects/registration-requests-data.effects';
import { LetModule } from '@ngrx/component';
const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'offerings/:id', component: OfferingComponent },
      {
        path: 'enrollments',
        component: EnrollmentsComponent,
        canActivate: [AutoLoginAllRoutesGuard],
        children: [
          {
            path: ':offeringid/register',
            component: RegisterComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    CoursesComponent,
    ListComponent,
    OfferingComponent,
    EnrollmentsComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      FeatureEffects,
      CourseEventHandlersEffects,
      CourseDataEffects,
      OfferingsEventHandlingEffects,
      OfferingsDataEffects,
      RegistrationRequestsEffects,
      RegistrationRequestsDataEffects,
    ]),
    RouterModule.forChild(routes),
    UiLibModule,
    StoreModule.forFeature(featureName, reducers),
    LetModule,
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoursesModule {}
