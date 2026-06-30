import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  page: { type: String, default: "/" }
});

export default mongoose.model("Visitor", visitorSchema);
