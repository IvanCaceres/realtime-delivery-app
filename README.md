This project was bootstrapped with a slightly customized version of [Create React App](https://github.com/facebook/create-react-app).
It maintains all of the same functionality but includes changes that allow it to integrate with a backend server like Laravel during development. https://github.com/IvanCaceres/create-react-app This package is hosted on npm as laravel-react-scripts

## Getting started

To run the development server you'll need to get the backend Laravel application and the frontend react application running.

Running the backend will require creating an env file based on the respective env-example files located in:


laradock env: backend/laradock/env-example -> .env

php-worker configuration file: backend/laradock/php-worker/laravel-worker.conf.example -> backend/laradock/php-worker/laravel-worker.conf

laravel env: backend/delivery/.env-example -> .env (make sure to add pusher api keys)




with the .env files in place you may proceed

To start the backend you'll need docker/docker-compose
You must start the backend docker containers from within the backend/laradock directory by running the following command from inside that directory:

`docker-compose up -d nginx postgres redis php-worker`

With the docker containers up you'll want to run composer install and php artisan migrate (to perform the database migrations)
To run these commands against the php Laravel application you'll need to enter the workspace docker container and run them:

From the backend/laradock directory enter the workspace container by running the following:

`docker-compose exec workspace bash`

You may then run the composer install and php artisan migrate commands

`composer install`
`php artisan migrate`
`php artisan storage:link` (created symlink for stroage uploads to be visible from public folder)

The backend app should now be reachable from http://localhost by default, you may configure the port the backend app runs on via the laradock/.env file, specifically the `NGINX_HOST_HTTP_PORT=80` `NGINX_HOST_HTTPS_PORT=443` entries.


You may now run the frontend application / dev webpack build process with the customized laravel-react-scripts create-react-app by doing the following:

You must set up the frontend env file by copying it from frontend/env.development-example -> frontend/.env.development

You also need to provide pusher / google maps api key in this .env file as well as confirm the backend_url settings (read comments in example)

From within the /frontend directory run:

`npm install`

`npm start`

The application will then open up in your default browser pointing to BACKEND_URL


## Production Build / Deployment Process
# Backend
The backend services used by docker/docker-compose are (nginx, postgres, redis, php-worker)


eg: `docker-compose up -d nginx postgres redis php-worker`



During development these services normally expose and bind ports from each of their respective containers, making these ports available for local use, ex: Postgres container binds port the local port to container port `5432:5432`, redis binds port `6379:6379` etc the services bind their typical ports and expose them publically which is undesired behavior on a live production server that can be accessed publically.



To resolve this security issue, remove/comment out the port bindings from the docker-compose.yml file from the services that run publically on the server (nginx, postgres, redis, php-worker), also making sure to comment out the port binding for the workspace server as well once you're done setting up the app / running Laravel/php commands.






