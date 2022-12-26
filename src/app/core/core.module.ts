import { NgModule } from '@angular/core';
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
        SharedModule,
        RouterLink
    ]
})
export class CoreModule { }
