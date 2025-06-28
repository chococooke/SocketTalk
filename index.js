// deps
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// routes
const authRoutes = require("./routes/auth.route.js");
const uiRoutes = require("./routes/ui.route.js");
const chatRoutes = require("./routes/chat.route.js");
const groupRoutes = require("./routes/group.route.js");

// dotenv config
dotenv.config({ quiet: true });

// Env Vars
const PORT = process.env.PORT || 5000;

// express app.
const app = express();

// middlewares
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/grp", groupRoutes);
app.use("/", uiRoutes);


// start server
app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
