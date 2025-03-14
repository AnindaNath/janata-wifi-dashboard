# Janata WiFi Dashboard

## Overview

The Janata WiFi Dashboard is a React-based web application for managing stock data with dynamic visualizations. It allows users to view stock prices, filter them by trade codes, add new stock records, edit existing records, and delete unwanted ones. The app also displays a watermark ("Janata WiFi") as a background element, which can be toggled on and off for visibility.

# What I Learned from This Project

I have never worked with the flask framework before, I have to see a lot of resources working together with reacts and flasks, have to see new documentation and Idea is taken from YouTube's suggested Video. I have learned a lot from the project, my interest in knowing has increased. I learned how to manage state using React hooks (`useState` and `useEffect`), make API calls, and handle dynamic data in a real-world scenario. Additionally, I became familiar with tools like Chart.js for data visualization and working with external APIs for data fetching.

## Challenges Faced:
- **State Management**: Initially, managing the state for different parts of the application was confusing, especially with handling the form submission and state changes for different actions (add, edit, delete).
- **Fetching Data**: I had to troubleshoot issues related to fetching data from the API and dealing with CORS issues.
- **Responsive Design**: Ensuring the design worked well on both desktop and mobile devices was a bit challenging, especially with dynamic components.

Overall, the project helped me deepen my understanding of front-end development and improve my problem-solving skills.


## Features

- **Stock Management**: View, add, edit, and delete stock records.
- **Dynamic Watermark**: Display a customizable watermark ("Janata WiFi") on the page, with the ability to toggle its visibility.
- **Stock Price Visualization**: A line chart to display stock price trends over time.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Search and Filter**: Filter stocks by trade code to view specific stock information.
  
## Technologies Used

- **Frontend**: 
  - React.js
  - Chart.js (for displaying stock price trends)
  - CSS for styling
- **Backend**: 
  - Flask (Python-based API for managing stock data)   
  -  SQLite database for storing stock data

## Setup and Installation



### Install Dependencies

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/janata-wifi-dashboard.git
    cd janata-wifi-dashboard
    ```

2. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

### Running the Application

Start the Backend Server

Navigate to the backend directory and run:

```bash
cd backend
python app.py
 ```

Start the Frontend

Navigate to the frontend directory and run:

```bash
cd frontend
npm run dev
 ```

The React frontend will start on http://localhost:5173/

