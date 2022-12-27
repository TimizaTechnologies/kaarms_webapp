/**
 * This table would store customer reviews and ratings of properties,
 * allowing users to see feedback from previous renters.
 */
export interface Review {
  $key: string;
  firstName: string;
  lastName: string;
  email: string
  mobileNumber: number;
}
