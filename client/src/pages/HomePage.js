import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [auth,setAutn]=useAuth();
    const [restaurants, setRestaurants]=useState([])
    const [categories, setCategories]=useState([])
    const navigate=useNavigate();

    //get all restaurants
    const getAllRestaurants=async()=>{
        try {
            const {data}=await axios.get('/restaurant/get-restaurants');
            setRestaurants(data.restaurants);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllRestaurants()
    }, []);


    return (
        <Layout>
            <div className='row mt-3'>
                <div className='col-md-3'>
                    <h4 className='text-center'>Filter By Category</h4>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Restaurants</h1>
                    <div className='d-flex flex-wrap'>
                        {restaurants.map((r)=>(
                                    <div className='card m-2 ' style={{width:"18rem"}}>
                                        <img src={`/restaurant/restaurant-photo/${r.slug}`} className='card-img-top' alt={r.name} />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{r.restName}</h5>
                                            <p className='card-text'>{r.description.substring(0,30)}...</p>
                                            <button className='btn btn-primary ms-1' onClick={()=>navigate(`/restaurant/${r.slug}`)}>More Details</button>
                                            <button className='btn btn-secondary ms-1'>Give Review</button>
                                        </div>
                                    </div>
                            ) )}
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default HomePage