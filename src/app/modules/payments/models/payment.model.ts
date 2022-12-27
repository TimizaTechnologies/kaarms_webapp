/**
 * This table would store information about payments made by users, including the amount paid,
 * the payment method, and the reservation or rental being paid for.
 * */

/*export interface Payment {

}*/
import {GenericResourceModel} from "@shared/models/generic-resource.model";

export class Payment extends GenericResourceModel<Payment> {
  public name!: string;
  public age!: number;
  public colour!: string;

  constructor(model?: Partial<Payment>) {
    super(model);
  }
}
