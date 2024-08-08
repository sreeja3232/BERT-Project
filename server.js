
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const request = require('request');


const connectDB = require('./config/db')
const Review = require('./models/reviewModel')
const Restaurant = require('./models/RatingsModel')

//dot config
dotenv.config()

//mongodb connection
connectDB();


//rest object ->features of express will be stored
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/restaurant', require('./routes/RatingRoutes'));

app.post('/api/v1/review/reviews'
    , async function (req, res) {
        const { restid, text } = req.body;
        console.log(text);
        console.log(restid);


        const dataToSend = {
            'text': text,
        };

        request.post({
            url: 'http://127.0.0.1:5000/predict',
            json: dataToSend,
        }, async function (error, response, body) {
            if (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
            }
            else {
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);

                const newReview = new Review({
                    restid,
                    text,
                    sentiment: body.sentiment,
                });
                try {
                    const savedReview = await newReview.save();

                    //update
                    const restaurant = await Restaurant.findById(restid);
                    console.log("restaurant is before updating", restaurant);

                    if (restaurant) {
                        if (body.sentiment === 'Positive') {
                            restaurant.positiveReviews = restaurant.positiveReviews + 1;
                        }
                        else {
                            restaurant.negativeReviews = restaurant.negativeReviews + 1;
                        }
                        await restaurant.save();
                        console.log("restaurant is after updating", restaurant);

                    }

                    //update overall rating
                    const updatedRestaurant = await Restaurant.findById(restid);
                    updatedRestaurant.overallRating = (updatedRestaurant.positiveReviews / (updatedRestaurant.positiveReviews + updatedRestaurant.negativeReviews)) * 5;

                    await updatedRestaurant.save();

                    console.log('Review saved:', savedReview);
                    res.status(200).json(savedReview);
                }
                catch (error) {
                    console.log('Error in saving review');
                    res.status(500).send('Internal server error');
                }
            }
        });
});


//port
const PORT = process.env.PORT || 8000


//listen
app.listen(PORT, () => {
    console.log(`Node server running on PORT ${process.env.PORT}`.bgBlue.white);
})
