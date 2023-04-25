import express from "express";
import user_get from "../controllers/userController";
import Transaction from "../models/transactionModel";

const userRoute = express.Router();

/* GET user account. */
userRoute.get("/:id", user_get);

userRoute.get("/:id/buy", (req, res) => {
  const id = req.params.id;
  console.log(res.locals.currentUser);
  if (!res.locals.currentUser) res.redirect("/");
  res.render("buy", { id });
});

userRoute.post("/:id/buy", async (req, res) => {
  const id = req.params.id;
  const { amount, walletAddress, paymentScreenshot } = req.body;
  try {
    const transaction = new Transaction({
      amount,
      user: id,
      walletAddress,
      paymentScreenshot,
    });
    await transaction.save();
    res.redirect(`/user/${id}`);
  } catch (err) {
    console.log(err);
  }
});

export default userRoute;
