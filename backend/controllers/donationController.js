import Donation from "../models/Donation.js";

/* ================= CREATE DONATION ================= */
export const donateToCollege = async (req, res) => {
  try {
    const { id, role } = req.user || {};
    if (!id || !role) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (role !== "alumni") {
      return res.status(403).json({ success: false, message: "Only alumni can donate" });
    }

    const { amount, message, purpose } = req.body || {};

    const donationAmount = Number(amount);
    if (!Number.isFinite(donationAmount) || donationAmount < 1) {
      return res.status(400).json({ success: false, message: "Please enter a valid amount" });
    }

    const donationPurpose =
      typeof purpose === "string" && purpose.trim().length > 0
        ? purpose.trim()
        : "College Donation";

    const donationMessage = typeof message === "string" ? message : "";

    // No external payment gateway yet — generating a local transaction ID
    const transactionId = `local_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    const donation = await Donation.create({
      alumniId: id,
      amount: donationAmount,
      message: donationMessage,
      purpose: donationPurpose,
      transactionId,
      status: "completed",
    });

    return res.status(201).json({
      success: true,
      message: "Donation submitted successfully!",
      data: donation,
    });
  } catch (error) {
    console.error("donateToCollege error:", error);
    return res.status(500).json({ success: false, message: "Server error while creating donation" });
  }
};