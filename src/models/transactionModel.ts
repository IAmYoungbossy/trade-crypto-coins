import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    user: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "cancelled"],
    },
    amount: { type: Number, required: true },
    walletAddress: { type: String, required: true },
    paymentScreenshot: { type: String, required: true },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", TransactionSchema);

export default Transaction;
