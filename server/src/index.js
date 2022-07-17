const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const connectDb = require("./db/mongoose");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");

app.use(express.json({ limit: "50mb" }), cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/api", userRoutes);
app.use("/api", todoRoutes);

app.use(errorMiddleware);

app.use(express.static(__dirname + "../../../client/build"));
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});

connectDb()
    .on("error", (error) => console.log(error.message))
    .on("open", (_) => {
        app.listen(PORT, (_) => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    });