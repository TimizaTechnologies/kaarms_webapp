import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { ForgotPasswordComponent } from '@auth/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '@auth/components/verify-email/verify-email.component';
import { ChangePasswordRequestComponent } from '@auth/components/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from '@auth/components/change-password/change-password.component';
import { SharedModule } from '@shared/shared.module';
/*import { AuthFacade } from '@auth/store/auth.facade';
import { AuthService, authServiceInitProvider } from '@auth/auth.service';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_KEY, authReducer } from '@auth/store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@auth/store/auth.effects';*/
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    // StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [RouterModule],
  // providers: [AuthFacade, AuthService, authServiceInitProvider],
})
export class AuthModule {}
