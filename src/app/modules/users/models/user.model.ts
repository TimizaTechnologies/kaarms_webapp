import { Reservation } from '../../reservations/models/reservation.model';

export type Role = 'MANAGER' | 'WRITER' | 'READER' | 'CLIENT';

/**
 *  This table would store information about individual users of the system,
 *  such as their name, contact information, and login credentials
 * */
export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  // reservations: Reservation[];

  uid?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;

  isAdmin?: boolean;
  roles?: Role[];
}

export const admin: User = {
  name: 'admin',
  isAdmin: true,
  roles: [],
};

export const manager: User = {
  name: 'manager',
  isAdmin: false,
  roles: ['MANAGER'],
};

export const writer: User = {
  name: 'writer',
  isAdmin: false,
  roles: ['WRITER'],
};

export const reader: User = {
  name: 'reader',
  isAdmin: false,
  roles: ['READER'],
};

export const readerAndWriter: User = {
  name: 'reader',
  isAdmin: false,
  roles: ['READER', 'WRITER'],
};

export const client: User = {
  name: 'client',
  isAdmin: false,
  roles: ['CLIENT'],
};

export const everyone: User = {
  name: 'client',
  isAdmin: false,
  roles: [],
};
