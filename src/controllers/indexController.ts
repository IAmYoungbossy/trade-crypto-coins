import { Request, Response } from "express";

// GET redirects to login page
const index_get = (req: Request, res: Response) => {
  res.redirect("/login");
};

export default index_get;
