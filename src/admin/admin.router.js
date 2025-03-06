const express = require("express");
const AdminService = require("./admin.service");
const router = express.Router();
const adminService = new AdminService();

router.post("/register", async (req, res) => {
  try {
    const result = await adminService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { adminName, password } = req.body;
  try {
    const result = await adminService.login(adminName, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
