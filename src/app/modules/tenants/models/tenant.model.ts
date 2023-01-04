import { Invoice } from '../../payments/models/invoice.model';

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  notes: string;
  invoices?: Array<Invoice>;
}
