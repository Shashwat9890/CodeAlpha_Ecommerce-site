
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const { userId, products, total } = req.body;
  const newOrder = new Order({ userId, products, total });
  await newOrder.save();
  res.send("Order placed");
});

module.exports = router;
