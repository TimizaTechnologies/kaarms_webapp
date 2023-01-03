import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormfieldControlService } from '@shared/services/formfield-control.service';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigService } from '@core/services/config.service';
import { GoogleAnalyticsService } from '@core/services/google-analytics.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormfieldControlService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Kaa RMS';

  constructor(
    private router: Router,
    private configService: ConfigService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    if (this.configService.isProd()) {
      this.setupGoogleAnalytics();
    }
  }

  private setupGoogleAnalytics() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(navigationEndEvent => {
        this.googleAnalyticsService.sendPageView(
          (navigationEndEvent as NavigationEnd).urlAfterRedirects
        );
      });
  }
}
