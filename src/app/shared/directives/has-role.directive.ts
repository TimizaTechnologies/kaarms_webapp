import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Role } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/services/users.service';
import { takeUntil } from 'rxjs/operators';

import { NgIf } from '@angular/common';
import { RxEffects } from '@rx-angular/state/effects';
import { mergeMap, Observable, Subject } from 'rxjs';

@Directive({
  selector: '[appHasRole], [hasRoleIsAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
  providers: [RxEffects],
})
export class HasRoleDirective {
  private store = inject(UsersService);
  private rxEffect = inject(RxEffects);
  private ngIf = inject(NgIf, { host: true });

  private show = new Subject<Observable<boolean | undefined>>();
  private show$ = this.show.asObservable().pipe(mergeMap(b => b));

  @Input('appHasRole') set role(role: Role | Role[] | undefined) {
    if (role) {
      this.show.next(this.store.hasAnyRole(role));
    }
  }

  @Input('hasRoleIsAdmin') set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.show.next(this.store.isAdmin$);
    }
  }

  constructor() {
    this.rxEffect.register(this.show$, this.showTemplate);
  }

  private showTemplate = (showTemplate: boolean | undefined) =>
    (this.ngIf.ngIf = showTemplate);
}
