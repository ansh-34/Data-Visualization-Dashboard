require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Data = require('../models/Data');
const connectDB = require('../config/db');

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Data.deleteMany({});
    console.log('Data cleared');

    // Read JSON file
    const jsonPath = path.join(__dirname, 'jsondata.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('jsondata.json not found in seed folder!');
      console.log('Please place jsondata.json in the backend/seed/ folder');
      process.exit(1);
    }

    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // Import data
    await Data.insertMany(jsonData);
    console.log(`${jsonData.length} records imported successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
