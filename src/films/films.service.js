const { uploadFile, deleteFile } = require("../storage/minio");
const Film = require("./films.model");

class FilmsService {
  findAllFilms = async () => await Film.find();

  findById = async (id) => {
    if (id.length !== 24)
      throw new Error("Некорректный ID. Он должен содержать 24 символа.");

    const film = await Film.findById(id);
    if (!film) throw new Error("Фильм не найден.");

    return film;
  };

  findByCategory = async (category) => {
    return await Film.find({ category });
  };

  createFilm = async (data, file) => {
    if (!file) {
      throw new Error("Файл изображения не загружен");
    }

    console.log("Загруженный файл:", file);

    const imageUrl = await uploadFile(file);

    const newFilm = new Film({ ...data, img: imageUrl });
    await newFilm.save();

    return { message: "Фильм успешно создан", film: newFilm };
  };

  deleteById = async (id) => {
    if (id.length !== 24)
      throw new Error("Некорректный ID. Он должен содержать 24 символа.");

    const deletedFilm = await Film.findByIdAndDelete(id);
    if (!deletedFilm) throw new Error("Фильм не найден.");

 
    const fileName = deletedFilm.img.split("/").pop(); 

 
    await deleteFile(fileName);

    return { message: "Фильм успешно удален", deletedFilm };
  };
}

module.exports = new FilmsService();
