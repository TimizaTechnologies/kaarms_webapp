import { User } from '../../users/models/user.model';

/**
 * Property photos: This table would store links to photos of properties, allowing users to view images of the rentals they are interested in.
 * Property amenities: This table would store information about the amenities available at each property, such as a pool, fitness center, or laundry facilities.
 * Property types: This table would store information about the types of properties available, such as apartments, houses, or vacation rentals.
 */

/**
 * This table would store information about the properties available for rent,
 * including details such as location, size, number of bedrooms, and price.
 * */
export interface Property {
  id: number;
  owner: User;
  location: string;
  size: number;
  description: string;
  price: number;
  amenities: string[];
  photos: string[];
}

export interface Book {
  $key: string;
  book_name: string;
  isbn_10: number;
  author_name: string;
  publication_date: Date;
  binding_type: string;
  in_stock: string;
  languages: Array<string>;
}
