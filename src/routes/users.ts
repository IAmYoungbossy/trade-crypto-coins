import express from "express";
import user_get from "../controllers/userController";
import Transaction from "../models/transactionModel";

const userRoute = express.Router();

/* GET user account. */
userRoute.get("/:id", user_get);

userRoute.get("/:id/buy", (req, res) => {
  const STYLE = "login";
  const id = req.params.id;
  if (!res.locals.currentUser) res.redirect("/");
  res.render("buy", { id, style: STYLE });
});

userRoute.post("/:id/buy", async (req, res) => {
  const id = req.params.id;
  const { amount, walletAddress, crypto } = req.body;
  try {
    const transaction = new Transaction({
      amount,
      crypto,
      user: id,
      walletAddress,
      paymentScreenshot: req.file?.filename,
    });
    await transaction.save();
    res.redirect(`/user/${id}`);
  } catch (err) {
    console.log(err);
  }
});

userRoute.get("/:id/details", async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findById(id);
    console.log(transaction);
    if (!transaction) res.redirect(`/user/${id}`);
    res.render("payment-details", {
      transaction,
      style: "admin",
    });
  } catch (err) {
    console.log(err);
  }
});

export default userRoute;
