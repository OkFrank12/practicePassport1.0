import { Application, Request, json, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import { envVar } from "./config/envVar";
import auth from "./routes/authRoutes";
import "./services/passportService";

export const appConfig = (app: Application) => {
  app.use(cors({ origin: "*" })).use(json());
  app.set("view engine", "ejs");

  app
    .use(
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [envVar.SESSION_KEY],
      })
    )
    .use((req: Request, res: Response, next: NextFunction) => {
      if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
          cb();
        };
      }

      if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
          cb();
        };
      }

      next();
    });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", auth);

  app.get("/", (req: Request, res: Response) => {
    res.render("hero", { user: req.user });
  });
};
