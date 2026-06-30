import express from "express";
import Visitor from "../models/Visitor.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { page } = req.body;
    const visitor = new Visitor({
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
      page: page || "/"
    });
    await visitor.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Visitor.countDocuments({ timestamp: { $gte: today } });
    res.json({ total, today: todayCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
