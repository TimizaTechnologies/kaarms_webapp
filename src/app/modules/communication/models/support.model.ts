export class FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export class SupportRequest {
  id: number;
  user: number;
  subject: string;
  message: string;
  createdAt: Date;
  resolvedAt: Date;
}
