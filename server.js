const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
