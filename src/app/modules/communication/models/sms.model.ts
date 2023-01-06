import { IMessage } from './message.interface';

export interface Sms extends IMessage {
  additional?: string;
}
