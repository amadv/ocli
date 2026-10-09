export class OcliError extends Error {
  status: number;
  url?: string;
  retryAfterSeconds?: number;

  constructor(message: string, status: number = 1, url?: string, retryAfterSeconds?: number) {
    super(message);
    this.name = 'OcliError';
    this.status = status;
    this.url = url;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
