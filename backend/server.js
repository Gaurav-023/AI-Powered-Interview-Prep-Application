require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { generateInterviewQuestions, generateConceptExplaination } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

const app = express();


//Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json()); 
connectDB();
//Routes(will define it later)
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplaination);




//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//Starting a Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));