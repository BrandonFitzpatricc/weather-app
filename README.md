# Weather App

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-563d7c?&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&labelColor=CB3837&logoColor=CB3837)
![Webpack](https://img.shields.io/badge/Webpack-529ac7?style=for-the-badge&labelColor=8DD6F9&logoColor=226ea9&logo=webpack)
![Figma](https://img.shields.io/badge/Figma-7e65ee?&style=for-the-badge)

This is a web application built using the MVC architectural pattern. It utilizes a combination of requests from various APIs to serve formatted weather information to the user, for either their current location or a location of their choice.

<b>NOTE:</b> This application only officially supports desktop and laptop devices. Official support for mobile devices will come in a future patch.

## Features
- Display the following weather information for any location:
  - The current temperature
  - The current conditions (represented by an icon)
  - The city and state
  - The current feel like temperature
  - The current high temperature
  - The current low temperature
  - The expected conditions, temperature, and rain probability for every hour of the current day
  - The expected rain probability, day/night conditions, and high/low temperatures for each day in the upcoming week (including the current day)
- Request the weather info for a location through geolocation with the user's permission
- Request the weather info for a location a location through a form for searching locations
- Request the weather info for a previously accessed location through a toggleable sidebar
- Reattempt failed requests multiple times through the use of exponential backoff
- Save existing locations upon closing the application and load them upon opening it

## APIs used
- <b>The Visual Crossing Weather API:</b> used for obtaining weather information when queried with a location
- <b>The Geolocation Web API:</b> used for obtaining the current user's coordinates with their permission
- <b>The TomTom Maps API:</b> used to parse coordinates from the Geolocation API into a city and state that can be passed to the Visual Crossing Weather API through reverse geocoding

## Author
I'm <a href="https://github.com/BrandonFitzpatricc">Brandon Fitzpatrick</a>, the designer and programmer behind this application. I created this application to improve my understanding of asynchronous JavaScript and API requests. I wanted to create something that utilizes multiple APIs in conjunction with each other, where the data received from one API is used within the request to another. Building this application involved designing and creating a pipeline of passing data between APIs, and has greatly strengthened my ability to utilize them effectively.
