const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/* ONLY ACCEPT */
let corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};

/* SETUP APP MIDDLEWARE */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

/* IMPORT ROUTES */
require("./routes/user.routes")(app);

/* APP LISTEN ON */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("\x1b[33m%s\x1b[0m", `Server is running on port ${PORT} ✔`);
});