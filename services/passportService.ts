import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { envVar } from "../config/envVar";
import userModel from "../model/userModel";

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user!);
});

passport.use(
  new Strategy(
    {
      callbackURL: "/auth/google/reverse",
      clientID: envVar.ID,
      clientSecret: envVar.SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile.emails![0].value);
        userModel.findOne({ googleID: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
            console.log(`current: `, currentUser);
          } else {
            new userModel({
              userName: profile.displayName,
              email: profile.emails![0].value,
              verified: profile.emails![0].verified,
              image: profile._json.picture,
              googleID: profile.id,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
                console.log(`new: `, newUser);
              });
          }
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  )
);
