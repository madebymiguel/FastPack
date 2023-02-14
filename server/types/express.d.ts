export interface User {
  name: string;
  email: string;
  password: string;
}

declare namespace Express {
  export interface Request {
    user: User;
  }

  export interface Response {
    user: User;
  }
}
