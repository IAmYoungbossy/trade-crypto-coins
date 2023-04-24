import bcrypt from "bcryptjs";
import User from "../models/userModel";
import passportLocal from "passport-local";

const strategy = passportLocal.Strategy;
type doneType = (
  error: any,
  user?: false | Express.User | undefined,
  options?: passportLocal.IVerifyOptions | undefined
) => void;

async function authenticateUser(
  username: string,
  password: string,
  done: doneType
) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false, {
        message: "Incorrect username",
      });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Incorrect password",
        });
      }
    });
  } catch (err) {
    return done(err);
  }
}

const LocalStrategy = new strategy(authenticateUser);

export default LocalStrategy;
