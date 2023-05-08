import { Request, Response } from "express";

// GET the home page which is login page
const index_get = (req: Request, res: Response) => {
  res.render("index", {
    style: "login",
    title: "Snappy Exchange",
    login_sub_style: "login_sub_style",
  });
};

export default index_get;
