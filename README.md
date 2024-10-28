# Weather Alert Application

This project is a weather alert application that provides weather information and personalized weather alerts for users. The application consists of a React frontend and a Node.js backend, with a PostgreSQL database.
## Installation

To get started with the project, follow these steps:

####  Clone the repository

```bash
git clone https://github.com/your-username/weather-alert-app.git
cd weather-alert-app
```


### 1. Docker setup
```
cd backend
```

## create a .env file and provide
```
OPEN_WEATHER_MAP_API_KEY={openWeatherAPIKey}
PORT = 8000
SMTP_HOST= {smtp_host} 
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password for Gmail, not your regular password
```

`cd app`

## create a .env file and provide

`REACT_APP_URL="http://localhost:8000"`

## Run the docker-compose command
## make sure that you are in the root folder containing docker-compose file 

`docker-compose up --build`

This will up the containers and now you can use the appication at 
http://localhost:3000/
