import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    user: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    amount: { type: Number, required: true },
    approved: { type: Boolean, default: false },
    walletAddress: { type: String, required: true },
    paymentScreenshot: { type: String, required: true },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
