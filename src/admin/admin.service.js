const bcrypt = require("bcryptjs");
const Admin = require("./admin.model");

class AdminService {
  register = async (adminData) => {
    const { adminName, password } = adminData;
    const existingAdmin = await Admin.findOne({ adminName });
    if (existingAdmin) {
      throw new Error("Администратор с таким именем уже существует.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      adminName,
      password: hashedPassword,
    });
    await newAdmin.save();

    return { message: "Регистрация успешна", adminId: newAdmin._id };
  };

  login = async (adminName, password) => {
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      throw new Error("Неверное имя или пароль.");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Неверное имя или пароль.");
    }

    return { message: "Авторизация успешна", adminId: admin._id };
  };
}

module.exports = AdminService;
