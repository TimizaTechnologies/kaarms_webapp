import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterLink } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreRoutingModule } from '@core/core-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environs';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '@auth/auth.module';
import { authInterceptorProviders } from '@auth/interceptors';
import { AboutComponent } from './components/about/about.component';
// import {AppModule} from "../app.module";

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    AboutComponent,
  ],
  exports: [ToolbarComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    RouterLink,

    /*// NgRx
    StoreModule.forRoot({}, {}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ name: 'Kaa RMS' }),*/
    /*environment.production
      ? []
      : StoreDevtoolsModule.instrument({ name: 'Kaa RMS' }),*/

    // Application
    AuthModule,
  ],
  providers: [
    // Interceptors
    // ...authInterceptorProviders,
  ],
})
export class CoreModule {
  /*constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }*/
  /*constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import only once in AppModule'
      );
    }
  }*/
}
