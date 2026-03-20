import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    // Who donated
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "Alumni", required: true },
    // Donation amount
    amount: { type: Number, required: true, min: 1 },
    // Optional message
    message: { type: String, default: "" },
    // Donation purpose
    purpose: { type: String, required: true, default: "College Donation" },
    // Local reference id (no payment gateway yet)
    transactionId: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    donatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
