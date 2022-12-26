import {User} from "../../users/models/user.model";
import {Property} from "../../properties/models/property.model";

/**
 * This table would store information about reservations made by users, including the property being rented,
 * the start and end dates, and the total cost.
 * */
export interface Reservation {
  id: number;
  user: User;
  property: Property;
  startDate: Date;
  endDate: Date;
  cost: number;
}
