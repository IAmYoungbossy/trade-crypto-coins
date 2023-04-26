import { Request, Response } from "express";

const index_get = (req: Request, res: Response) => {
  const STYLE = "login";
  const SUB_STYLE = "login_sub_style";
  if (res.locals.currentUser) {
    if (res.locals.currentUser.role === "user") {
      res.redirect(
        `/user/${res.locals.currentUser._id.toString()}`
      );
    }
    if (res.locals.currentUser.role === "admin") {
      res.redirect("/admin");
    }
  } else
    res.render("index", {
      style: STYLE,
      login_sub_style: SUB_STYLE,
    });
};

export default index_get;
