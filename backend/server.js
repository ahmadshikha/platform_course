import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';

import courseRoutes from "./routes/courseRoute.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import userRegisterRoute from "./routes/userRegisterRoute.js";
import contactRoutes from "./routes/contactRoutes.js";
// import adminRoute from "./routes/AdminRoute.js";
import admin from './routes/admin.js'
import newsRoutes from "./routes/newsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);








dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

var whitelist = [
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost:8080',
]

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true)
    console.log('CORS origin:', origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 3000); // 3000 ms = 3 seconds
});

app.use(cors(corsOptions))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser())
     
connectDB();

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/userRegister", userRegisterRoute);
app.use("/api/admin", admin);
app.use("/api/contact", contactRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send(" API with MVC is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
