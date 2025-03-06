const bcrypt = require("bcryptjs");
const User = require("./users.model");
class UserService {
  register = async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new Error("Пользователь с таким email уже существует.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return { message: "Регистрация успешна", userId: newUser._id };
  };

  findByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Пользователь не найден.");
    }
    return user;
  };

  login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Неверный email или пароль.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Неверный email или пароль.");
    }

    return { message: "Авторизация успешна", userId: user._id };
  };

  deleteById = async (id) => {
    if (id.length !== 24) {
      throw new Error("Некорректный ID. Он должен содержать 24 символа.");
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("Пользователь не найден.");
    }

    return { message: "Пользователь успешно удален", deletedUser };
  };
}

module.exports = new UserService();
