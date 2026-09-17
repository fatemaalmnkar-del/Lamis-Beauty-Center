const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/services', serviceRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);





const PORT = process.env.PORT || 3000;

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})
