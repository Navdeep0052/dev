import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "admin"], default: "user" },
  name: { type: String, default: "Visitor" },
  email: { type: String, default: "" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  sessionId: { type: String, default: "" }
});

export default mongoose.model("ChatMessage", chatMessageSchema);
