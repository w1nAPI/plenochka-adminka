const sendAllFilms = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { data } = req;

  console.log({ data });
  if (!data) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.json(data);
};

module.exports = sendAllFilms;
