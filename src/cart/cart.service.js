const Cart = require("./cart.model");
const Film = require("../films/films.model");
const mongoose = require("mongoose");

class CartService {
  // Получить корзину пользователя
  async getCart(userId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return { message: "Корзина не найдена." };
    return cart;
  }

  // Добавить товар в корзину
  async addToCart(userId, filmId, quantity = 1) {
    if (!mongoose.isValidObjectId(filmId)) {
      throw new Error("Неверный формат filmId.");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const film = await Film.findById(filmId);
    if (!film) throw new Error("Фильм не найден.");

    const item = cart.items.find((item) => item.filmId.equals(filmId));
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ filmId, quantity });
    }

    await cart.save();
    return cart;
  }

  // Обновить количество товара в корзине
  async updateQuantity(userId, filmId, quantity) {
    if (quantity < 1) return this.removeFromCart(userId, filmId);

    const cart = await Cart.findOne({ userId });
    if (!cart) return { message: "Корзина не найдена." };

    const item = cart.items.find((item) => item.filmId.equals(filmId));
    if (!item) throw new Error("Фильм не найден в корзине.");

    item.quantity = quantity;
    await cart.save();
    return cart;
  }

  // Удалить товар из корзины
  async removeFromCart(userId, filmId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return { message: "Корзина не найдена." };

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => !item.filmId.equals(filmId));

    if (cart.items.length === initialLength) {
      throw new Error("Фильм не найден в корзине.");
    }

    await cart.save();
    return cart;
  }

  // Очистить корзину
  async clearCart(userId) {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );
    if (!cart) return { message: "Корзина не найдена." };
    return cart;
  }
}

module.exports = new CartService();
