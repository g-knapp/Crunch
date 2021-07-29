This is the starter template for CS312 projects based on Next.js](https://nextjs.org/). _The project is a forum and community building site where Middlebury college users can make image-based posts and comment on posts that others have made. The goal is to facilitate community among students and provide an informal and semi-anonymous gathering space._

The project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and includes a number of additional libraries, including the Rest Testing Library, Jest, and ESLint, among others. It also includes the basic configuration for using Travis CI.

To ensure consistent style, this template is also set up with [Prettier](https://github.com/prettier/prettier), with the configuration to automatically reformat code during a commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the `package.json` file.

## Travis CI Badge
[![Build Status](https://travis-ci.com/csci312-f20/project-xanaduxolo.svg?token=aLEoWhBUEae3oyBhp6cW&branch=main)](https://travis-ci.com/csci312-f20/project-xanaduxolo)

## Heroku Link
https://xanadu-xolo-crunch.herokuapp.com/

## Getting Started

First run the following knex commands:

```bash
npx knex migrate:latest --env development
npx knex seed:run --env development
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
## Auth0

To get authentication working, create an Auth0 account. Create a regular web page application with Auth0 and find the following variables.
Then copy them into .env.development.local in the following format:
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_DOMAIN=
NEXTAUTH_URL=http://localhost:3000/
Then add a callback of the form http://localhost:3000/api/auth/callback/auth0 into the allowed callbacks part of your Auth0 app. 
If developing non-locally, change the localhost:3000 to the corresponding site. 

## Testing

To run tests, just run the test script:

```
npm test
```

You can also run the tests in "watch" mode where it will re-run the tests as you save your work:

```
npm test -- --watch
```

You can also run jest selectively on a single file using `npx`:

```
npx jest path/to/file
```

## Linting

The repository is set up to run eslint with our custom rule set we have used for the last assignments.

```
npm run lint
```

## Continuous Integration

The skeleton is setup for CI with Travis-CI.

## Deploying to Heroku

Your application can be deployed to [Heroku](heroku.com) using the approach demonstrated in this [repository](https://github.com/mars/heroku-cra-node).

Assuming that you have a Heroku account, have installed the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and committed any changes to the application, to deploy to Heroku:

1. Log in to Heroku

```
heroku login
```

1. Create the Heroku app, e.g., to create a project called `project-name`:

   ```
   heroku create project-name
   ```

1. Push to Heroku

   ```
   git push heroku main
   ```

1. Open your newly deployed application

```
heroku open
```

Depending on how you implement your server, you will likely need create "add-ons" for your database, etc. and migrate then seed your database before you deploy.

### Heroku with RDBMS

Heroku provides a free add-on with the PostgreSQL database. Provision the add-on with the following command. The provisioning will define `process.env.DATABASE_URL` in the Heroku environment (which can be used by your database interface, e.g. by Knex in its configuration file).

```
heroku addons:create heroku-postgresql:hobby-dev
```

Once you have deployed your application (and provisioned the database) migrate and seed the database on Heroku with the following commands. `heroku run` executes the specified command in the context of your application on the Heroku servers.

```
heroku run 'npx knex migrate:latest'
heroku run 'npx knex seed:run'
```

You can test your backend without pushing to Heroku. The database Heroku created for you is accessible from anywhere. Use `heroku config` to obtain the `DATABASE_URL` variable. Define that variable locally with `?ssl=true` appended, e.g.

```
export DATABASE_URL="postgres://...?ssl=true"
```

You can also directly access your PostgreSQL database. Download and install one of the many PostgreSQL clients and use the `DATABASE_URL` from Heroku for the connection information.

### Heroku with MongoDB

Heroku has several MongoDB add-ons. Provision a free MongoDB add-on with:

```
heroku addons:create mongolab:sandbox
```

Once you have deployed your application (and provisioned the database) seed the database on Heroku with `mongoimport`. You will need the `MONGODB_URI` from `heroku config`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
