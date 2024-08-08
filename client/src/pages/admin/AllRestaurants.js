import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import {Link} from 'react-router-dom'

const AllRestaurants = () => {
    const [restaurants, setRestaurants]=useState([]);

    //get all restaurants
    const getAllRestaurants=async()=>{
        try {
            const {data}=await axios.get('/restaurant/get-restaurants');
            setRestaurants(data.restaurants);
        } 
        catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }
    useEffect(()=>{
        getAllRestaurants();
    }, []);


    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Restaurants</h1>
                        <div className='d-flex flex-wrap'>
                            {restaurants.map((r)=>(
                                <Link key={r._id} to={`/dashboard/admin/restaurant/${r.slug}`} className='rest-link'>
                                    <div className='card m-2 ' style={{width:"18rem"}}>
                                        <img src={`/restaurant/restaurant-photo/${r.slug}`} className='card-img-top' alt={r.name} />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{r.restName}</h5>
                                            <p className='card-text'>{r.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ) )}
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AllRestaurants