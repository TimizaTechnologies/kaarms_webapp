/**
 * This table would store customer reviews and ratings of properties,
 * allowing users to see feedback from previous renters.
 */
export interface Student {
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
}

export interface Review {
  id: number;
  property: number;
  user: number;
  rating: number;
  comment: string;
  created_at: Date;
}
