##FastPizza-Api

The api consists in a Backend system built with NodeJs, Typescript, ExpressJs, and MongoDB.

Its a system for publishing and managing Pizza advertises, there is a sign in/up system, capability to upload images on the ads, comments and likes sistem and sorting options

##Functional Requirements

FR 1 - Project structuring, database conection and environment configuration;

FR 2 - System to registe users, options to update, search, delete and create users with validation, email uniqueness check, passwords must contain letters and numbers, the data must be persistent in the database;

FR 3 - Login system for users with authentication through JSON Web oken and Bearer Token;

FR 4 - Publish pizza ads, an Ad must contain name, description, ingredients, photo, price, user that published, to publish an Ad the user must be authenticated;

FR 5 - Comment and like system for the Ads, capability to add and remove likes/comments, route to check all comments of an Ad;

FR 6 - Deploy on heroku;

FR 7 - Like and comment system on each comment;

FR 8 - List comments on an Ad based on the number of likes on each comment (positive to negative);

FR 9 - Route to check the pizza with the most likes;

##Run app

To run the app you need to download the insomnia documentation for the requests.

In the insomnia app there are environment variables set, you should see in every requisition the heroku URL where the app is deployed.

To do any of the requests on private routes you need to pass in the Auth tab a Bearer Token, there is a token thats setup in the environment variables which can be used, in case the user that has that token is deleted you can use the User Authenticate request to generate a new token.

You can also run the backend by cloning the repository and running the command "yarn run dev", you will have to uncomment line 34 on the file "server.ts" located at "./src" (it needs to be commented to run the tests), you also have to change the URL of the requisitions from "HEROKU_URL" to "BASEURL" in the insomnia app.

##Running tests

To run the tests make sure the line 34 in the file "server.ts" is commented (located at "./src"), then in the terminal use the command "yarn run test".

There are tests for all Routes (using supertest), and controller(plain jest), based on --coverage by testing these files we also test services, utils and middlewares (all tests are positive scenario)
