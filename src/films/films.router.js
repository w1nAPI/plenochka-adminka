const { Router } = require("express");
const FilmsService = require("./films.service.js");
const multer = require("multer");

const router = Router();

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

 
router.get("/", async (req, res) => {
  try {
    const films = await FilmsService.findAllFilms();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении фильмов" });
  }
});

 
router.get("/category/:category", async (req, res) => {
  try {
    const films = await FilmsService.findByCategory(req.params.category);
    res.json(films);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Ошибка при получении фильмов по категории" });
  }
});

 
router.get("/:id", async (req, res) => {
  try {
    const film = await FilmsService.findById(req.params.id);
    res.json(film);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

 
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const newFilm = await FilmsService.createFilm(req.body, req.file);
    res.status(201).json(newFilm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

 
router.delete("/:id", async (req, res) => {
  try {
    const result = await FilmsService.deleteById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
