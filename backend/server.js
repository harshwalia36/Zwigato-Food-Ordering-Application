require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const onboardingRestaurantsRoutes = require('./routes/onboarding_restaurants');

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
});

app.use('/partner-with-us/new', onboardingRestaurantsRoutes);

console.log(process.env.MONGO_URI);
//connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Connected to MongoDb and Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

