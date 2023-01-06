import { IMessage } from './message.interface';

export interface Mail extends IMessage {
  subject: string;
  bcc?: string;
}
