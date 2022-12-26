import {Reservation} from "../../reservations/models/reservation.model";

/**
 *  This table would store information about individual users of the system,
 *  such as their name, contact information, and login credentials
 * */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  // reservations: Reservation[];

   uid?: string;
   displayName?: string;
   photoURL?: string;
   emailVerified?: boolean;
}
