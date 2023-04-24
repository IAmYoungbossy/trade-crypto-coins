import User from "../models/userModel";

type doneType = (
  err: any,
  user?: false | Express.User | null | undefined
) => void;

const deserializeUserObj = async (
  id: unknown,
  done: doneType
) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

export default deserializeUserObj;
