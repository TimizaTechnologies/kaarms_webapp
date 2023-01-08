export interface IMessage {
  id: number;
  message: string;
  sender: string;
  recipient: string;
}

export class Message {
  id: number;
  sender: number;
  recipient: number;
  subject: string;
  body: string;
  createdAt: Date;
  readAt: Date;
}
