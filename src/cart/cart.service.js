const Cart = require("./cart.model");
const Film = require("../films/films.model");

class CartService {
  getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate("items.filmId");
    if (!cart) throw new Error("Корзина не найдена.");
    return cart;
  };

  addToCart = async (userId, filmId, quantity = 1) => {
    const cart =
      (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });
    const film = await Film.findById(filmId);
    if (!film) {
      throw new Error("Фильм не найден.");
    }
    const itemIndex = cart.items.findIndex((item) =>
      item.filmId.equals(filmId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ filmId, quantity });
    }

    await cart.save();
    return cart;
  };

  updateQuantity = async (userId, filmId, quantity) => {
    if (quantity < 1) {
      return this.removeFromCart(userId, filmId);
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Корзина не найдена.");
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.filmId.equals(filmId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
    } else {
      throw new Error("Пленка не найдена в корзине.");
    }

    return cart;
  };

  removeFromCart = async (userId, filmId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Корзина не найдена.");
    }

    cart.items = cart.items.filter((item) => !item.filmId.equals(filmId));
    await cart.save();
    return cart;
  };

  clearCart = async (userId) => {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
    if (!cart) {
      throw new Error("Корзина не найдена.");
    }
    return cart;
  };
}

module.exports = new CartService();
