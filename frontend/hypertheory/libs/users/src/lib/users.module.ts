import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from 'angular-auth-oidc-client';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/effects/user.effects';
import { AuthService } from './services/auth.service';
import { featureName, reducers } from './state';
import { LoginIndicatorComponent } from './components/login-indicator/login-indicator.component';

@NgModule({
  declarations: [LoginIndicatorComponent],
  imports: [
    CommonModule,
    AuthModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [AuthService],
  exports: [LoginIndicatorComponent],
})
export class UsersModule {}
