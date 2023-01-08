import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouteReuseStrategy, RouterLink } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreRoutingModule } from '@core/core-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '@auth/auth.module';
import { authInterceptorProviders } from '@auth/interceptors';
import { AboutComponent } from './components/about/about.component';
import {
  MainStatsComponent,
  StackedChartComponent,
} from './components/dashboard/main-stats/main-stats.component';
import { CustomRouteReuseStrategy } from './strategies/custom-route-reuse.strategy';
import { BreadCrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoreComponent } from './core.component';
import { TopbarComponent } from './components/topbar/topbar.component';
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
    MainStatsComponent,
    StackedChartComponent,
    SidenavComponent,
    NavbarComponent,
    CoreComponent,
    TopbarComponent,
  ],
  exports: [ToolbarComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    RouterLink,

    // Application
    AuthModule,
    BreadCrumbModule,
  ],
  providers: [
    // Interceptors
    // ...authInterceptorProviders,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
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
