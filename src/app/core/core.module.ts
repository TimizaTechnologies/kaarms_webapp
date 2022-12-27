import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {SharedModule} from "@shared/shared.module";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {RouterLink} from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {CoreRoutingModule} from "@core/core-routing.module";
// import {AppModule} from "../app.module";



@NgModule({
    declarations: [
        HeaderComponent,
        PageNotFoundComponent,
        LoginComponent,
        RegisterComponent,
        ToolbarComponent,
        DashboardComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent
    ],
    exports: [
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
        RouterLink
    ]
})
export class CoreModule {
  /*constructor(
    @Optional() @SkipSelf() parentModule?: AppModule
  )
  {
    // Do not allow multiple injections
    if ( parentModule )
    {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }*/
  /*constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }*/
}
