import express from 'express';
import 'dotenv/config';
import cors from 'cors';  
import connectDB  from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
const Port = process.env.PORT || 5000;

connectDB();

app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRouter); 
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});



