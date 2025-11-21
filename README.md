A full-stack web application that uses AI to recognize food from images and estimate nutritional values. Served with a Flask backend for ML predictions (hosted on Render) and a Vite + React frontend 
(hosted on Vercel).
This AI app was developed as a college learning project.
It predicts only the following 13 food items:
Burger
Dal
Kachori
Maggi
Margherita Pizza
Masala Dosa
Rice
Roti
Salad
Samosa
Sandwich
Vegetable besan chilla
Vadapav

Features
Upload images of food and instantly get food name, confidence and calories/macronutrients (protein, carbs, fats, fiber).

Runs a custom machine learning model served via Flask on Render.

User-friendly web interface on Vercel — mobile and desktop friendly.

Nutrition data fetched from a custom CSV and linked to predicted classes.

Frontend-backend API securely connected via environment variables.

Logs and saves food entries for tracking (optional).

Modern UI built with React, TypeScript, and component libraries.

Demo
Live Frontend:
https://dishdecoded.vercel.app
(Replace with your actual link if different)

Live Backend (API, for testing):
https://dishdecoded.onrender.com

How It Works
User uploads a food photo on the web interface (Vercel)

The frontend sends the image (multipart/form-data) to the /predict endpoint on the Flask backend (Render)

The backend loads a trained ML model, predicts the food class, and looks up nutrition details from a CSV file

Results (food name, confidence, nutrition info) are returned as JSON and displayed in the UI

Technologies Used
Layer	Technology
Frontend	React, Vite, TypeScript, Tailwind/Custom CSS
Backend	Flask, Python, joblib (ML), pandas, CORS
Model	Image-based food classification (.pkl)
Nutrition	CSV lookup (pandas)
Hosting	Vercel (frontend), Render (backend)
Folder Structure
text
/food-calorie-tracking-app
    /src
        /components
            FoodScanner.tsx
    /backend
        api_integration.py
        food_rf_model.pkl
        nutrition_data.csv
    vite.config.ts
Setup and Deployment
Backend (Render)
Place your Flask app (api_integration.py and model file) and requirements.

Add CORS support (flask_cors).

Deploy on Render as a Web Service.

Test the /predict endpoint in Hoppscotch/Postman by uploading an image.

Frontend (Vercel)
Vite + React project: Make sure all API fetch URLs use:

js
const baseUrl = import.meta.env.VITE_API_URL
Add environment variable in Vercel:

Key: VITE_API_URL

Value: your Render backend URL

Configure your vite.config.ts for correct output directory (dist).

Push to GitHub, Vercel will auto deploy.

Test live site and verify predictions.

Common Issues & Solutions
Prediction stuck on loading / not working:

Check that Vercel’s environment variable is correct and code uses VITE_API_URL.
Force a clean redeploy (uncheck "Use existing Build Cache").
Backend may be sleeping—first request may take 20–60s on Render free plan.
CORS errors:
Make sure flask_cors is enabled in Flask app.
Frontend sending requests to localhost:
This means the build isn’t using the right environment variable name.
Contributing
Pull requests welcome! For major changes, open an issue first to discuss what you’d like to change.
License
This project is licensed under the MIT License.

Credits
Shivam Gupta(BTech CSE(AIML)) 
ML Model: Custom
Dataset: Custom/nutrition_data.csv
Powered by Flask, React, Vercel, Render
