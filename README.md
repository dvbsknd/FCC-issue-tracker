# Issue Tracker

This is the solution to a [final challenge](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker) in the freeCodeCamp [quality assurance](https://www.freecodecamp.org/learn/quality-assurance/) certification. Although a [boilerplate repository](https://github.com/freeCodeCamp/boilerplate-project-issuetracker/) is supplied, it contains a whole lot of complex code to support running of tests remotely by the freeCodeCamp platform. Given that at the time of writing all the test scripts specified in [their repo](https://github.com/freeCodeCamp/freeCodeCamp/blob/production-current/curriculum/challenges/english/06-quality-assurance/quality-assurance-projects/issue-tracker.english.md) are blank I decided to just build up the project from scratch to get a better feel for testing with [Mocha](https://www.npmjs.com/package/mocha) &amp; [Chai](https://www.npmjs.com/package/chai) in a stand-alone environment.

## Services

The project depends on a remotely-visible instance of the app to be served to submit the assessment, and something like [REPL.it](https://repl.it/) does a good job of that. You'll also need a publicly accessible Mongo database (hosted somewhere like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) to store data/state for the API.

## Goals/Todo

Development steps are documented here for tracking and articulating progress:

### Done

1. Initialise the repo and set the remote on Github
1. Add a good README to explain the project goals and set-up
1. Initialise with `npm` and create the `package.json`
1. Add a `dev` script that allows reading of the `.env` locally
1. Add the `.env` file
1. Exclude `node_modules` and `.env` files from Git
1. Set up Express with a Hello World (JSON)
1. Set up ESlint
1. Set up Nodemon
1. Set up the test framework
1. Add 404 handling for unknown routes
1. Implement XSS protection with Helmet
1. Set-up a Router for the API
1. Set up a database connection
1. Stub out the POST endpoint for the `/issues` route
1. Implement a proper MVC pattern with callbacks
1. Set-up a basic front-end
1. Split the repo into `client` and `api`.
1. Try and add some tests for the front-end code
1. Mock-up the front-end rendering of an issue with Bootstrap
1. Render the list of issues on the home page as HTML
1. Try combining the api and web routes and serving JSON/HTML based on a header
1. Fix the tests that are now failing due to the refactor
1. Implement a modal for editing issues
1. Stub out the PUT endpoint for the `/issues` route
1. Stub out the GET endpoint for the `/issues` route (done along the way)
1. Add a test for GET
1. Implement the `/:projectId` route/handling to associate issues with a project
1. Deprecate the `/issues` subfolder, everything from route
1. Try to create a single database object to be used within models
1. Resolve errors for 404 handling
1. Display project name on individual issues
1. Stub out the DELETE endpoint

### Todo

1. Finalise/add tests for client-side JavaScript
1. Try to make custom Errors for "not found", "bad data", etc.
1. Use the default 'Accepts' header for sniffing expected content type

## Local Development

You'll need an `.env` file with:

1. `PORT`
1. `MONGO_URI`

The rest is pretty straightforward, with `npm` for package management and `nodemon` for development server. Use `npm run dev` for starting up the local server.

## Dependencies

Notable packages and concepts include:

1. [MongoDB](https://www.npmjs.com/package/mongodb)
1. [Chai](https://www.npmjs.com/package/chai) with [HTTP](https://www.npmjs.com/package/chai-http) to assert
1. [Mocha](https://www.npmjs.com/package/mocha) to run tests
1. [Helmet](https://www.npmjs.com/package/helmet) and [CORS](https://www.npmjs.com/package/cors) for setting appropriate headers
1. [Nodemon](https://www.npmjs.com/package/nodemon) for running a local dev server with hot-reloading
1. [ESLint](https://www.npmjs.com/package/eslint) for code-checking
1. [Bootstrap](https://getbootstrap.com/docs/4.0/) for front-end components

## Architecture

Admittedly, the architecture of this app is a little strange, but I wanted to explore a few ideas with the structuring of my repo. I tried to implement as "pure" an MVC implementation as possible, with as much separation as possible between the API, front-end rendering logic and the controllers and models. The idea is that you would be able to use the controllers via an Express-powered API (in `/routes`) _or_ in something like a CLI tool. The controllers would be Express-agnostic.

I also wanted to "write my own models" for the data and use the native [MongoDB driver](https://mongodb.github.io/node-mongodb-native/) for Node.js rather than using an ORM like [Mongoose](https://mongoosejs.com/)—mostly just to help me understand how MongoDB and the concept of an ORM actually work. It's not really finished enough so this makes it feel like the separation between routes, controllers and models is a little artificial.

In theory, I should be able to "swap out" MongoDB for another data store like [SQLite](https://www.sqlite.org/index.html) withouth having to touch _anything_ but the `/models`) folder, and I do think that's currently the case.
