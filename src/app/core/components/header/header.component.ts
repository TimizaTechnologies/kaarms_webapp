import { Component } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  readonly menuItems = [
    { link: '/home', label: 'Home', icon: null },
    { link: '/about', label: 'About', icon: null },
    { link: '/secured-feat', label: 'Secured Feature', icon: 'tuiIconLock' },
  ];
  // authUser$ = this.authFacade.user$;

  constructor(private authFacade: AuthService) {}

  logout() {
    this.authFacade.logout();
  }
}
