import { Request, Response, Router } from "express";
import passport from "passport";

const auth: Router = Router();

//for login
auth.get("/login", (req: Request, res: Response) => {
  const user = req.user;
  res.render("login", { user });
});

//for logout
auth.get("/logout", (req: Request, res: Response) => {
  req.logout;
  res.redirect("/");
});

//for auth scope
auth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//for google redirections
auth.get(
  "/google/reverse",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: any, res: Response) => {
    console.log(req.user);

    return res.render("home", { user: req.user });
    // return res.redirect('/profile/')
  }
);

export default auth;
