# RideIn - Ride Booking Platform with Weather Integration

Welcome to **RideIn**, a ride-booking platform that allows users to book rides between locations with real-time weather updates for both the pickup and destination. This web application provides a smooth booking experience, and updates users on weather conditions for enhanced travel planning.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [API Integration](#api-integration)
- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)


## Live Demo

You can access the live application here: (https://ride-booking.vercel.app/)

## Features

- Book a ride with a specific pickup and destination.
- Real-time weather updates for both pickup and destination locations.
- Form validation to ensure accurate and complete ride information.
- Mobile-friendly design and responsive layout for all devices.

## API Integration

RideIn integrates with the **OpenWeatherMap API** to provide live weather updates for the selected pickup and destination locations.

- **API Name**: OpenWeatherMap API
- **API Documentation**: [OpenWeatherMap API](https://openweathermap.org/api)
- **API Key**: You'll need your own API key to run this project locally.


## Technologies

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Vercel (for deployment)
- **Weather API**: OpenWeatherMap
- **State Management**: React Context API
- **Forms and Validations**: React hooks (`useState`, `useEffect`)
- **Notifications**: React Toastify
- **Deployment**: Vercel

## Screenshots

### Main Booking Screen:
![image alt](https://github.com/Johnfavour/Ride-Booking/blob/38dabbc503c009126f7f468c2a674a0145a7ccac/ride1.png)
![image alt](https://github.com/Johnfavour/Ride-Booking/blob/8b44292041d027c5c8726636a61b4871feecfd1d/ride%20(2).png)


## Installation & Setup

To run the RideIn project locally, follow these steps:

### Install the React vite app

Make sure you have the following installed:
- Vite (or use `npm init vite@latest` to create a Vite project)

### Step-by-Step Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Johnfavour/Ride-Booking.git
   cd Ride-booking
2. **Install dependencies:**
   npm install

3. **Environment Variables:**

You need to create a `.env` file at the root of the project with the following variable. For Vite-based projects, environment variables are prefixed with VITE_, like the following example below

VITE_MY_API_KEY=your_openweathermap_api_key   



