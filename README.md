# Social Media Frontend

Frontend interface for social media application

The app is currently deployed [here](silly-tesla-e6e8ce.netlify.app/).

But you can also run the frontend and the server locally (see instructions below).

## Purpose 

1. Develop frontend interface for a social media [RESTful API](https://github.com/elewites/AppServer/blob/main/README.md).
2. Allow user to loging, register, make posts and comment on posts. 

## Installation

Clone repository

Once cloned run `npm install`

Checkout into the `develop` branch. This is important if you will run the server locally as it updates the endpoints to 
the local server. You have two options, either stay in `main` branch and run the frontend locally and the use the deployed server or run both locally (checkout the AppServer repo below for instructions on urnning server locally). 

Then run `npm start` to start the application

In order for application to work properly on your local machine the RESTful API must be running. 

Check out the [REST API](https://github.com/elewites/AppServer) for instructions on spinning up the server locally

Once the server is running properly the application should look like this: 

<img width="931" alt="image" src="https://user-images.githubusercontent.com/69447634/236649554-c3c7d2d6-19cd-49c9-93ba-a38b0be1092d.png">

If the server is not up, no posts will show up on the landing page and the user will not be able to login or register

<img width="919" alt="image" src="https://user-images.githubusercontent.com/69447634/236649598-65637b15-dbe7-4528-9de5-627e0f959436.png">

Clicking on each post allows user to comment

<img width="914" alt="image" src="https://user-images.githubusercontent.com/69447634/236650108-c39377d9-aa31-4fcd-a477-63623e929068.png">



