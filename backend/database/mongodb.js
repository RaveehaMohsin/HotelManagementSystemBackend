const mongoose = require("mongoose");


// Optional: Set Mongoose to use the new MongoDB driver's `useNewUrlParser` and `useUnifiedTopology` features
mongoose.set('strictQuery', false); // Configure Mongoose settings (optional)

// Connect to MongoDB Atlas
mongoose.connect(
  'mongodb+srv://mohsinraveeha:raveeha123@hotelmanagementsystem.tk8qw.mongodb.net/',
  {
    useNewUrlParser: true, // Use the new URL parser (ensures compatibility with the new MongoDB driver)
    useUnifiedTopology: true, // Use the new unified topology engine (recommended)
  }
);

const db = mongoose.connection;

// Event listeners for database connection
db.on('error', (error) => console.log('Database connection error:', error));
db.once('open', () => console.log('Database connected successfully'));

module.exports = {db};
