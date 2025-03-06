const { Router } = require("express");
const CartService = require("./cart.service");
const mongoose = require("mongoose");

const router = Router();

 
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Неверный формат userId." });
    }
    const cart = await CartService.getCart(userId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

 
router.post("/:userId", async (req, res) => {
  try {
    const { filmId, quantity } = req.body;
    const userId = req.params.userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Неверный формат userId." });
    }
    const cart = await CartService.addToCart(userId, filmId, quantity);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

 
router.put("/:userId", async (req, res) => {
  try {
    const { filmId, quantity } = req.body;
    const userId = req.params.userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Неверный формат userId." });
    }
    const cart = await CartService.updateQuantity(userId, filmId, quantity);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

 
router.delete("/:userId/:filmId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    const filmId = req.params.filmId.trim();
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(filmId)
    ) {
      return res
        .status(400)
        .json({ message: "Неверный формат userId или filmId." });
    }
    const cart = await CartService.removeFromCart(userId, filmId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
 
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Неверный формат userId." });
    }
    const cart = await CartService.clearCart(userId);
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
