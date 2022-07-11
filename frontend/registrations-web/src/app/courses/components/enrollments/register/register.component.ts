import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  CreateRegistrationModel,
  FormModel,
  RegistrationRequestCreateModel,
} from 'src/app/courses/models';
import { selectRegistrationModel } from 'src/app/courses/state';
import { registrationRequestsEvents } from 'src/app/courses/state/actions/registration-requests.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model$!: Observable<CreateRegistrationModel>;
  form!: FormGroup<FormModel<RegistrationRequestCreateModel>>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}
  readonly commentsMaxLength = 200;
  ngOnInit(): void {
    this.form = new FormGroup<FormModel<RegistrationRequestCreateModel>>({
      agreesToParticipate: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
      agreesToPay: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
      comments: new FormControl('', {
        nonNullable: true,
        validators: [Validators.maxLength(this.commentsMaxLength)],
      }),
      amount: new FormControl(0, { nonNullable: true }),
      courseOffering: new FormControl('', { nonNullable: true }),
    });

    this.model$ = this.store.select(selectRegistrationModel).pipe(
      tap((model) => {
        const offeringId = model.offering?.id || '';
        const amount = model.offering?.price || 0;
        this.form.controls.courseOffering.setValue(offeringId);
        this.form.controls.amount.setValue(amount);
      })
    );
  }

  get termsHasErrors() {
    return (
      this.form.get('agreesToParticipate')?.errors &&
      this.form.get('agreesToPay')?.errors &&
      this.termsTouchedOrDirty
    );
  }
  get termsTouchedOrDirty() {
    return (
      (this.form.get('agreesToParticipate')?.touched ||
        this.form.get('agreesToParticipate')?.dirty) &&
      (this.form.get('agreesToPay')?.touched ||
        this.form.get('agreesToPay')?.dirty)
    );
  }
  get agreeToTerms() {
    return (
      this.form.get('agreesToParticipate')?.value &&
      this.form.get('agreesToPay')?.value
    );
  }

  get formReady() {
    return this.agreeToTerms;
  }
  get hasComments() {
    return this.form.controls.comments.value.length > 0;
  }
  submit() {
    if (this.form.valid) {
      const payload = this.form.value as RegistrationRequestCreateModel;
      this.store.dispatch(
        registrationRequestsEvents.registrationrequested({ payload })
      );
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }
}
