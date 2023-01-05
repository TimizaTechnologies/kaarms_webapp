import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormfieldControlService } from '@shared/services/formfield-control.service';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigService } from '@core/services/config.service';
import { GoogleAnalyticsService } from '@core/services/google-analytics.service';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormfieldControlService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Kaa RMS';
  elem;
  isFullScreen: boolean;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private googleAnalyticsService: GoogleAnalyticsService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this.chkScreenMode();
    this.elem = document.documentElement;

    if (this.configService.isProd()) {
      this.setupGoogleAnalytics();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }

  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
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

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
