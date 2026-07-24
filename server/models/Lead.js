import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    budgetRange: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Lead", leadSchema);
