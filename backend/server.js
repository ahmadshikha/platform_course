import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import courseRoutes from "./routes/courseRoute.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import userRegisterRoute from "./routes/userRegisterRoute.js";
import adminRoute from "./routes/adminRoute.js";
// import newsRoutes from "./routes/newsRoutes.js";
// import activityRoutes from "./routes/activityRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);








dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
     
connectDB();

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/userRegister", userRegisterRoute);
app.use("/api/adminRoute", adminRoute);
// app.use("/api/news", newsRoutes);
// app.use("/api/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send(" API with MVC is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
