import { Express } from "express";

declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number | undefined;
    }
  }
}

type doneType = (err: any, id?: unknown) => void;

const serializeUserForSession = (
  user: Express.User,
  done: doneType
) => {
  done(null, user.id);
};

export default serializeUserForSession;
