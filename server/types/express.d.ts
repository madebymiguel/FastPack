// export interface User {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

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
