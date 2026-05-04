# weather-app

This is a weather website that was created using HTML, CSS, and JavaScript. It uses a combination of requests from multiple APIs to provide formatted weather information for either the current location of a user, or a location provided directly by the user. 

Weather information is obtained from GET requests to the Visual Crossing Weather API. The responses from these requests are first processed by the application, which will obtain, save, and manipulate the data from the response as needed. Upon the completion of processing a successful request, the following data will be displayed for the corresponding location:
- The current temperature
- The current conditions (represented by an icon)
- The city and state
- The current feel like temperature
- The current high temperature
- The current low temperature
- The expected conditions, temperature, and rain probability for every hour of the current day
- The expected rain probability, day/night conditions, and high/low temperatures for each day in the upcoming week (including the current day)

When a request is made to a new location, that location will be saved. Saved locations can be accessed through a toggleable sidebar, where they can be clicked on to request the current weather information for that location, or deleted. 

If a user has given the application location permissions, then on startup, the application will first use the built in Geolocation API to obtain the coordinates of the user. Those coordinates will then be passed to the tomtom Maps API, which will use reverse geocoding to obtain the corresponding city and state. Lastly, this city and state will be passed to the Visual Crossing Weather API, and the data retrieved will be processed and displayed as outlined above. 

Alternatively, the sidebar provides a button to bring up a form where the user can manually enter a location to save it and retrieve its weather information. If this form is submitted with a valid city and state, then they will be passed to the Visual Crossing Weather API, and the data retrieved will be processed and displayed as outlined above.

The interface provides a button that will convert each temperature displayed between fahrenheit and celsius. The current temperature scale selected will be saved, similarly to locations.

This project demonstrates proficient use of HTML, CSS, and JavaScript, along with the use of APIs to request and process external data. It utilizes promise-based asynchronous JavaScript to make requests to multiple APIs without disrupting the user experience. 