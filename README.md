# House Price Prediction System 🏠

A machine learning-powered web application that predicts house prices based on property features. Built with React frontend and Django backend.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Accessing the Application](#accessing-the-application)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This application consists of two main parts:

1. **Backend** (Python/Django)
   - Handles API requests
   - Runs the machine learning prediction model
   - Located in `backend/` folder

2. **Frontend** (React/JavaScript)
   - User-friendly web interface
   - Beautiful UI for property details input
   - Shows prediction results
   - Located in `frontend/` folder

---

## Prerequisites

Before starting, make sure your computer has:

### For Backend:
- **Python** (version 3.8 or higher)
  - Download from: https://www.python.org/downloads/
  - **Important**: During installation, check the box "Add Python to PATH"

### For Frontend:
- **Node.js** (version 14 or higher)
  - Download from: https://nodejs.org/
  - This will automatically install `npm` (Node Package Manager)

### To Check if Installed:
Open Command Prompt (Windows) or Terminal (Mac/Linux) and run:

```bash
python --version
node --version
npm --version
```

If all three show version numbers, you're ready to go!

---

## Backend Setup

### Step 1: Open Command Prompt in the Backend Folder

1. Open File Explorer
2. Navigate to: `house prediction project/backend/config/`
3. Click on the address bar at the top
4. Type `cmd` and press Enter
5. A Command Prompt window will open in this folder

### Step 2: Create a Virtual Environment

A virtual environment is like a container that keeps this project's packages separate from others.

```bash
python -m venv ../../../env
```

Wait for this to complete (it might take 1-2 minutes).

### Step 3: Activate the Virtual Environment

You should see `(env)` at the beginning of the command line when it's activated.

**On Windows:**
```bash
env\Scripts\activate
```

**On Mac/Linux:**
```bash
source env/bin/activate
```

### Step 4: Install Backend Dependencies

```bash
pip install -r requirements.txt
```

This downloads and installs all the Python packages needed. Wait for it to complete.

### Step 5: Prepare the Database

```bash
python manage.py migrate
```

This creates the database file needed for the application.

### Step 6: Start the Backend Server

```bash
python manage.py runserver
```

You should see output like:
```
Starting development server at http://127.0.0.1:8000/
```

**Keep this Command Prompt window open!** The backend is now running.

---

## Frontend Setup

### Step 1: Open a New Command Prompt in the Frontend Folder

1. Open File Explorer
2. Navigate to: `house prediction project/frontend/`
3. Click on the address bar and type `cmd` and press Enter

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This downloads all the JavaScript packages needed. This might take 2-3 minutes.

### Step 3: Start the Frontend Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v7.3.1  ready in 988 ms

  ➜  Local:   http://localhost:5173/
```

**Keep this Command Prompt window open!** The frontend is now running.

---

## Running the Project

### Quick Summary:

You need **TWO Command Prompt windows open at the same time**:

1. **Backend Command Prompt** (in `backend/config/` folder)
   ```bash
   python manage.py runserver
   ```

2. **Frontend Command Prompt** (in `frontend/` folder)
   ```bash
   npm run dev
   ```

Both should show "running" messages indicating they're active.

---

## Accessing the Application

Once both servers are running:

1. Open your web browser (Chrome, Firefox, Safari, Edge, etc.)
2. Go to: **http://localhost:5173/**
3. You should see the House Price Prediction homepage

### Features:
- **Home Page**: Overview and information about the service
- **Predict Page**: Enter property details to get price predictions
- **Multi-step Form**: Organized input across 3 steps
  - Step 1: Basic information (area, bedrooms, bathrooms, etc.)
  - Step 2: Amenities (features like AC, parking, etc.)
  - Step 3: Review and get prediction

---

## Stopping the Application

When you're done:

1. **Close the Frontend**: Press `Ctrl + C` in the frontend Command Prompt
2. **Close the Backend**: Press `Ctrl + C` in the backend Command Prompt
3. Both servers will stop gracefully

---

## Troubleshooting

### Problem: "Python is not recognized"

**Solution:**
- Python wasn't added to PATH during installation
- Reinstall Python and check "Add Python to PATH" during setup
- Or use the full path: `C:\Python39\python.exe` (adjust version number)

### Problem: "npm is not recognized"

**Solution:**
- Node.js wasn't installed properly
- Restart your computer after installing Node.js
- Reinstall Node.js if problems persist

### Problem: Backend won't start / Port 8000 is already in use

**Solution:**
- Another application is using port 8000
- Kill the process:
  ```bash
  netstat -ano | findstr :8000
  taskkill /PID <PID_NUMBER> /F
  ```
- Or use a different port:
  ```bash
  python manage.py runserver 8001
  ```

### Problem: Frontend won't start / Port 5173 is already in use

**Solution:**
- Kill the process using the port or use a different port:
  ```bash
  npm run dev -- --port 5174
  ```

### Problem: "Backend server not responding" error on the website

**Solution:**
- Make sure the backend Command Prompt shows "Starting development server"
- Check if Django is running on `http://127.0.0.1:8000/`
- Restart the backend server

### Problem: Virtual environment not activating

**Solution:**
- Make sure you're in the correct folder
- Try the full path:
  ```bash
  C:\Users\lenovo\OneDrive\Desktop\house prediction project\env\Scripts\activate
  ```

### Problem: Dependencies won't install

**Solution:**
- Make sure virtual environment is activated (you should see `(env)` in command line)
- Try upgrading pip:
  ```bash
  python -m pip install --upgrade pip
  ```
- Then retry:
  ```bash
  pip install -r requirements.txt
  ```

---

## Project Structure

```
house prediction project/
├── backend/                    # Django backend
│   ├── config/                # Django project folder
│   │   ├── manage.py         # Run commands here
│   │   └── db.sqlite3        # Database file
│   └── predictor/            # App folder
│
├── frontend/                   # React frontend
│   ├── src/                   # Source code
│   │   ├── pages/            # Page components
│   │   ├── App.jsx           # Main component
│   │   └── main.jsx          # Entry point
│   └── package.json          # Dependencies list
│
├── model/                      # ML model files
│   └── data/                 # Training data
│
├── env/                       # Virtual environment (created during setup)
│
└── README.md                  # This file
```

---

## Next Steps

After the project is running:

1. **Explore the UI**: Navigate through the home page and prediction page
2. **Make a Prediction**: 
   - Click "Start Predicting"
   - Fill in property details
   - See the AI-powered price prediction
3. **Check Results**: View detailed analysis of your property

---

## Tips for Success

✅ **Do This:**
- Keep both Command Prompts open while using the app
- Use consistent Python and Node.js versions
- Check error messages carefully
- Restart servers if something seems wrong

❌ **Don't Do This:**
- Close Command Prompts while using the website
- Run multiple instances of the same server
- Modify backend code without restarting
- Use spaces in folder names (they can cause issues)

---

## Getting Help

If you encounter issues:

1. Read the error message carefully
2. Check the Troubleshooting section above
3. Restart both servers
4. Clear browser cache (Ctrl + Shift + Delete in Chrome)
5. Try a fresh installation if problems persist

---

## System Requirements

**Minimum:**
- RAM: 4GB
- Storage: 2GB free
- OS: Windows 7+, Mac OS 10.12+, Linux

**Recommended:**
- RAM: 8GB
- Storage: 5GB free
- OS: Windows 10+, Mac OS 12+, Modern Linux

---

## Support

For additional help or questions, review this README carefully or check the project's issue tracker.

---

## License

This project is for educational purposes.

---

**Happy Predicting! 🎯**

Last Updated: February 4, 2026
