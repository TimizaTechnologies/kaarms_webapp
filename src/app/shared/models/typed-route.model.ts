import { Route } from '@angular/router';
import { Role } from '@modules/users/models/user.model';

export interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    roles?: Role[];
  };
}
