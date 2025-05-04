require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db'); // Import database connection

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Example)
app.get('/', (req, res) => {
    res.send('Hello, MongoDB is connected!');
});

const userRoutes = require('./src/modules/user/userRoutes');
app.use('/api/users', userRoutes);

const authRoutes = require('./src/modules/auth/authRoutes');
app.use('/api/auth', authRoutes);

const movieRoutes = require('./src/modules/movie/movieRoutes')
app.use("/api/movies", movieRoutes);

const showRoutes = require('./src/modules/show/showRoutes')
app.use('/api/show', showRoutes)

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});