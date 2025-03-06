const { Router, json } = require("express");
const UserService = require("./users.service");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json("Пользователь создан");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await UserService.findByEmail(req.params.email);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await UserService.deleteById(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginResponse = await UserService.login(email, password);
    res.json(loginResponse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
