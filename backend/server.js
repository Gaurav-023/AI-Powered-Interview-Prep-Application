require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = expres();

//Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Routes(will define it later)

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//Starting a Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));