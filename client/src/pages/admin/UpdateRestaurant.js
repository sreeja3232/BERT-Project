import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { Select } from 'antd';
import {useNavigate, useParams } from 'react-router-dom';


const UpdateRestaurant = () => {
    const [categories, setCategories]=useState([]);
    const [category, setCategory]=useState([]);
    const [restName, setRestName]=useState("");
    const [description, setDescription]=useState("");
    const [photo, setPhoto]=useState("");
    const [id, setId]=useState("");

    const {Option}=Select;
    const navigate=useNavigate();
    const params=useParams();



    //get all categories
    const getAllCategory=async()=>{
        try {
            const {data} =await axios.get("/category/get-categories");
            // console.log(data);
            if(data?.success){
                setCategories(data?.category);
            }  
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
            
        }
    }

    useEffect(()=>{
        getAllCategory();
    }, []);




    //get single restaurant
    const getSingleRestaurant=async()=>{
        try {
            const {data}=await axios.get(`/restaurant/get-restaurant/${params.slug}`)
            // console.log(data);
            setRestName(data.restaurants.restName);
            setDescription(data.restaurants.description);
            setId(data.restaurants._id);
            setCategory(data.restaurants.location._id);
        } catch (error) {
            console.log(error);
            alert("Smthng went wrong");
            
        }

    }
    useEffect(()=>{
        getSingleRestaurant();
        //eslint-disable-next-line
    }, []);


    // create restaurant function
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const restData=new FormData();
            restData.append("location", category);
            photo && restData.append("photo", photo);
            restData.append("restName", restName);
            restData.append("description", description);
            // console.log(restData);

            const {data}=axios.put(`/restaurant/update-restaurant/${id}`, restData);
            if(data?.success){
                alert(data?.message)
            }
            else{
                alert("Resaturant Updated successfully");
                navigate('/dashboard/admin/all-restaurant')
            }
        }
        catch(error){
            console.log(error);
            alert("Smntng went wrong"); 
        }
    }


    //delete restaurant
    const handleDelete=async()=>{
        try {
            let answer=window.prompt("Are u sure to delete?");
            if(!answer) return;
            const {data}=await axios.delete(`/restaurant/delete-restaurant/${id}`)
            alert("Restaurant deleted successfully");
            navigate('/dashboard/admin/all-restaurant');
            
        } catch (error) {
            console.log(error)
            alert("Smtng went wrong");
            
        }

    }

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Update Restaurant</h1>
                        <div className='m-1 w-75'>

                            {/* for category/location */}

                            <Select bordered={false} placeholder="Select a location" size="large" showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
                                {categories?.map(c=>(
                                    <Option key={c._id} value={c._id}>{c.location}</Option>
                                ) )}
                            </Select>

                            {/* for photo */}
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo?photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.currentTarget.files[0])} hidden/>
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ?(
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt='Restaurant photo' height={'200px'} className='img img-responsive' />
                                    </div>
                                ):(
                                    <div className='text-center'>
                                        <img src={`/restaurant/restaurant-photo/${params.slug}`} alt='Restaurant photo' height={'200px'} className='img img-responsive' />
                                    </div>
                                )
                                }
                            </div>

                            {/* to enter restaurant name */}
                            <div className='mb-3'>
                                <input type='text' value={restName} placeholder='Enter restaurant name' className='form-control' onChange={(e)=>setRestName(e.target.value)}/>

                            </div>

                            {/* to enter restaurant description */}
                            <div className='mb-3'>
                                <textarea type='text' value={description} placeholder='Enter restaurant description' className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
                            </div>

                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>UPDATE RESTAURANT</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>DELETE RESTAURANT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UpdateRestaurant