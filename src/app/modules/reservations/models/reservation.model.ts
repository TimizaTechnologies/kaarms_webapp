/**
 * This table would store information about reservations made by users, including the property being rented,
 * the start and end dates, and the total cost.
 * */
export interface Reservation {
  id?: number;
  tenant: number;
  property: number;
  start_date: Date;
  end_date: Date;
  cost: number;
}
