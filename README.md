# Social Media Frontend

Frontend interface for social media application

The app is currently deployed [here](https://silly-tesla-e6e8ce.netlify.app/).

But you can also run the frontend and the server locally (see instructions below).

## Purpose 

1. Develop frontend interface for a social media [RESTful API](https://github.com/elewites/AppServer/blob/main/README.md).
2. Allow user to loging, register, make posts and comment on posts. 

## Installation

Clone repository

Once cloned run `npm install`

At this point you have two options
1. Checkout into the `develop` branch. This is important if you will run the server locally as the `develop` branch has the endpoints that communicate with the local server. 
- Check out the [REST API](https://github.com/elewites/AppServer) for instructions on spinning up the server locally

2. Stay in `main` branch and run the this frontend application locally
- With this option you will be using the deployed server with the frontend application running locally (make sure you stay in `main` branch)

After this, run `npm start` to start the application regardless of the option chosen above

If you have done everything correctly (server is running properly) the application should look like this: 

<img width="931" alt="image" src="https://user-images.githubusercontent.com/69447634/236649554-c3c7d2d6-19cd-49c9-93ba-a38b0be1092d.png">

If the server is not up, no posts will show up on the landing page and the user will not be able to login or register

<img width="919" alt="image" src="https://user-images.githubusercontent.com/69447634/236649598-65637b15-dbe7-4528-9de5-627e0f959436.png">

Clicking on each post allows user to comment

<img width="914" alt="image" src="https://user-images.githubusercontent.com/69447634/236650108-c39377d9-aa31-4fcd-a477-63623e929068.png">



