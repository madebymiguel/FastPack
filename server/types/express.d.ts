export interface UserPayload {
  userId: string;
  email: string;
}

declare global {
  declare namespace Express {
    export interface Request {
      user: UserPayload;
    }

    export interface Response {
      user: UserPayload;
    }
  }
}
