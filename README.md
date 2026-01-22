# Data Visualization Dashboard - MERN Stack

A full-stack data visualization dashboard built with MongoDB, Express.js, React, and Node.js. Features interactive charts and dynamic filtering capabilities.

## 🚀 Features

- **Interactive Charts**: Line, Bar, and Pie charts using Chart.js
- **Dynamic Filters**: Real-time data filtering by multiple parameters
- **Responsive Design**: Modern UI with Tailwind CSS
- **REST API**: Full backend API with MongoDB integration
- **Data Import**: Script to seed database from JSON file

## 📊 Visualizations

1. **Intensity vs Year** - Line chart showing intensity trends over time
2. **Topics Count** - Bar chart of top 10 topics
3. **Region Distribution** - Pie chart showing data distribution by region
4. **Likelihood by Sector** - Horizontal bar chart of sector likelihood

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

### Frontend
- React 19
- Vite
- Tailwind CSS
- Chart.js & React-ChartJS-2
- Axios

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection URI)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
cd data-visualization-dashboard
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment (optional - edit .env file if needed)
# Default MongoDB: mongodb://localhost:27017/datavisualization

# Import data into MongoDB
# First, make sure MongoDB is running
# Then place your jsondata.json in backend/seed/ folder (sample file included)
npm run seed

# Start the backend server
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
# Frontend runs on http://localhost:3000
```

## 📁 Project Structure

```
data-visualization-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── dataController.js     # API logic
│   ├── models/
│   │   └── Data.js               # Mongoose schema
│   ├── routes/
│   │   └── dataRoutes.js         # API routes
│   ├── seed/
│   │   ├── importJson.js         # Data import script
│   │   └── jsondata.json         # Sample data
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js            # API service
    │   ├── charts/
    │   │   ├── IntensityChart.jsx
    │   │   ├── TopicsChart.jsx
    │   │   ├── RegionChart.jsx
    │   │   └── LikelihoodChart.jsx
    │   ├── components/
    │   │   ├── Dashboard.jsx     # Main dashboard
    │   │   └── FilterPanel.jsx   # Filters component
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css             # Tailwind CSS
    ├── .env                       # Environment variables
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── package.json
```

## 🔌 API Endpoints

### GET /api/data
Get all data with optional filters

**Query Parameters:**
- `end_year` - Filter by end year
- `topic` - Filter by topic
- `sector` - Filter by sector
- `region` - Filter by region
- `pestle` - Filter by PESTLE category
- `source` - Filter by source
- `country` - Filter by country
- `city` - Filter by city

**Example:**
```
GET http://localhost:5000/api/data?sector=Energy&region=Northern America
```

### GET /api/filters
Get all unique filter values for dropdowns

**Response:**
```json
{
  "success": true,
  "filters": {
    "endYears": ["2020", "2025", ...],
    "topics": ["oil", "automation", ...],
    "sectors": ["Energy", "Manufacturing", ...],
    ...
  }
}
```

## 📊 Data Schema

The MongoDB collection stores documents with the following fields:

- `intensity` (Number) - Intensity value
- `likelihood` (Number) - Likelihood score
- `relevance` (Number) - Relevance score
- `end_year` (String) - End year
- `country` (String) - Country name
- `topic` (String) - Topic/category
- `region` (String) - Geographic region
- `city` (String) - City name
- `sector` (String) - Industry sector
- `pestle` (String) - PESTLE category
- `source` (String) - Data source
- `swot` (String) - SWOT category

## 🎨 Customization

### Adding Your Own Data

1. Replace `backend/seed/jsondata.json` with your data file
2. Ensure your JSON follows the schema structure
3. Run `npm run seed` in the backend folder

### Styling

- Modify `frontend/tailwind.config.js` for custom Tailwind theme
- Edit component styles in respective `.jsx` files
- Update `frontend/src/index.css` for global styles

## 🚀 Deployment

### Backend
- Deploy to services like Heroku, Railway, or Render
- Update MongoDB URI to cloud instance (MongoDB Atlas)
- Set environment variables

### Frontend
- Deploy to Vercel, Netlify, or similar
- Update `VITE_API_URL` to your backend URL
- Run `npm run build` before deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🐛 Issues

If you encounter any issues, please create an issue in the repository.
