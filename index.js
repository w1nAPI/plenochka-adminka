const express = require("express");
const cors = require("cors");  
const path = require("path");
const filmsRouter = require("./src/films/films.router");
const userRouter = require("./src/users/users.router");
const cartRouter = require("./src/cart/cart.router");
const adminRouter = require("./src/admin/admin.router");
const connectToDatabase = require("./database/connect");

const app = express();
connectToDatabase();

const corsOptions = {
  origin: "http://localhost:8081", 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.headers.origin);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "src")));

app.use("/films", filmsRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
