// export interface Invoice {
export class Invoice {
  id: string;
  tenant: number;
  created_date: Date;
  due_date: Date;
  service: string;
  value: number;
  additional_notes: string;
}

/*export class Invoice {
  _id: String;
  created: Date;
  due: Date;
  service: String;
  value: Number;
  additionalNotes: String;
}*/
