ENV VARIABLES 

Create a .env file in the root and add 

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id


INSTALL THE DEPENDANCIES

npm install
cd frontend
npm install

SEED THE DATABASE
You can use the following commands to seed the database with some sample users and products as well as destroy all data

# Import data
npm run data:import

# Destroy data
npm run data:destroy

Sample User Logins

test@teser.com (Admin)
123456

john@example.com (Customer)
123456

janeDoe@example.com (Customer)
123456



RUN 

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server


BUILD AND DEPLOY

