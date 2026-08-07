export class DomainError extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = "DomainError";
  }
}
  
export class NotFoundError extends DomainError {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

export class ConflictError extends DomainError {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
  }
}
