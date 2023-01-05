import { Injectable, inject } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Role } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/services/users.service';
import { Observable, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionGuard implements CanMatch {
  private router = inject(Router);
  private userStore = inject(UsersService);

  canMatch(route: Route): Observable<boolean | UrlTree> {
    const accessRolesList: Role[] = route.data?.['roles'] ?? [];
    const isAdmin: boolean = route.data?.['isAdmin'] ?? false;
    return this.hasPermission$(isAdmin, accessRolesList);
  }

  private hasPermission$(isAdmin: boolean, accessRolesList: Role[]) {
    return this.userStore.isUserLoggedIn$.pipe(
      mergeMap(hasUser => {
        if (hasUser) {
          if (isAdmin) {
            return this.userStore.isAdmin$.pipe(map(Boolean));
          } else if (accessRolesList.length > 0) {
            return this.userStore
              .hasAnyRole(accessRolesList)
              .pipe(map(Boolean));
          }
          return of(false);
        } else {
          return of(this.router.parseUrl('no-user'));
        }
      })
    );
  }
}
