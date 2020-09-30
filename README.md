# Issue Tracker

This is the solution to a [final challenge](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker) in the freeCodeCamp [quality assurance](https://www.freecodecamp.org/learn/quality-assurance/) certification. Although a [boilerplate repository](https://github.com/freeCodeCamp/boilerplate-project-issuetracker/) is supplied, it contains a whole lot of complex code to support running of tests remotely by the freeCodeCamp platform. Given that at the time of writing all the test scripts specified in [their repo](https://github.com/freeCodeCamp/freeCodeCamp/blob/production-current/curriculum/challenges/english/06-quality-assurance/quality-assurance-projects/issue-tracker.english.md) are blank I decided to just build up the project from scratch to get a better feel for testing with [Mocha](https://www.npmjs.com/package/mocha) &amp; [Chai](https://www.npmjs.com/package/chai) in a stand-alone environment.

## Services

The project depends on a remotely-visible instance of the app to be served to submit the assessment, and something like [REPL.it](https://repl.it/) does a good job of that. You'll also need a publicly accessible Mongo database (hosted somewhere like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) to store data/state for the API.

## Goals/Todo

Development steps are documented here for tracking and articulating progress:

- ✓ Initialise the repo and set the remote on Github
- ✓ Add a good README to explain the project goals and set-up
- ✓ Initialise with `npm` and create the `package.json`
- ✓ Add a `dev` script that allows reading of the `.env` locally
- ✓ Add the `.env` file
- ✓ Exclude `node_modules` and `.env` files from Git
- ✓ Set up Express with a Hello World (JSON)
- ✓ Set up ESlint
- ✓ Set up Nodemon
- ✓ Set up the test framework
- Implement XSS protections with Helmet
- Add 404 handling for unknown routes
- Set up a database connection
- Stub out POST, PUT, GET, DELETE for the `/api/issues` route

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
