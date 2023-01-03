import { Invoice } from '../../payments/models/invoice.model';

export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  notes: string;
  invoices: Array<Invoice>;
}
