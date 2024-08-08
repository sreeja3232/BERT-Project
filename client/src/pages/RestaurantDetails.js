import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Modal, Button } from 'antd';

const RestaurantDetails = () => {

    const params = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);


    //get single restaurant
    useEffect(() => {
        if (params?.slug) getRest()
        // eslint-disable-next-line
    }, [params?.slug]);

    const getRest = async () => {
        try {
            const { data } = await axios.get(`/restaurant/get-restaurant/${params.slug}`);
            console.log(data);
            setRestaurant(data?.restaurants)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (restaurant?._id) {
            getReviews();
        }
    }, [restaurant]);
    const getReviews = async () => {
        try {
            const { _id } = restaurant;
            console.log(_id);
            const { data } = await axios.get(`/restaurant/all-reviews/${_id}`);
            console.log(data);
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    };


    // on submiting the review.
    const handleReviewSubmit = async () => {
        try {
            const { _id } = restaurant;
            const response = await axios.post('http://localhost:8000/api/v1/review/reviews', { restid: _id, text: reviewText });
            console.log(response);

            if (response.data) {
                console.log('Review submitted successfully:', response.data.message);
                setReviewText('');
                setReviewModalVisible(false);
                getRest();
                getReviews();

            }
            else {
                console.log('Review submission failed:', response.data.message);
            }
        }
        catch (error) {
            console.log('Error submitting review:', error);
        }
    };


    return (
        <Layout>
            <div className='row container mt-2'>
                {/* photo block */}
                <div className='col-md-6'>
                    <img className='card-img-top' src={`/restaurant/restaurant-photo/${restaurant.slug}`} alt={restaurant.restName} />
                </div>

                {/* details of restaurant */}
                <div className='col-md-6'>
                    <h1 className='text-center'>Restaurant Details </h1>
                    <h6>Name :  {restaurant.restName}</h6>
                    <h6>Description :  {restaurant.description}</h6>
                    {restaurant.location && (
                        <h6>Location : {restaurant.location.location}</h6>
                    )}
                    <h6>Rating : {restaurant.overallRating}</h6>

                    <Button type='primary' onClick={() => setReviewModalVisible(true)}>
                        Give Review
                    </Button>

                </div>
            </div>

            <Modal title='Enter Review' visible={reviewModalVisible} onCancel={() => setReviewModalVisible(false)} onOk={handleReviewSubmit}>
                <div className='mb-3'>
                    <textarea rows={4} type='text' className='form-control' placeholder='Enter review here...' value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                </div>

            </Modal>

            <div className='container mt-4'>
                <h2>Reviews</h2>
                <div>
                    {reviews.map((review) => (
                        <div key={review._id} className='mb-3'>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout >

    )
}

export default RestaurantDetails