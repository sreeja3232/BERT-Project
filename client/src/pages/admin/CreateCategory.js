import React, {useEffect, useState} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'
const CreateCategory = () => {
    const [categories, setCategories]=useState([]);
    const [location, setLocation]=useState("");
    const [visible, setVisible] = useState(false);
    const [selected,  setSelected]=useState("");
    const [updatedName, setUpdatedName]=useState("");


    //handle form 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post('/category/create-category', {location})
            if(data.success){
                alert(`${location} is created`);
                getAllCategory();
            }
            else{
                alert(data.message);
            }
            
        } catch (error) {
            console.log(error);
            alert("Smtng went wrong");
            
        }
    }

    //get all categories
    const getAllCategory=async()=>{
        try {
            const {data} =await axios.get("/category/get-categories");
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


    //handle update
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.put(`/category/update-category/${selected._id}`, {location:updatedName});
            if(data.success){
                alert(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else{
                alert(data.message);
            }
            
        } catch (error) {
            console.log(error);
            alert("Smtng went wrong");
            
        }
    }

    //delete category
    const handleDelete=async(lid)=>{
        
        try {
            const {data}=await axios.delete(`/category/delete-category/${lid}`);
            if(data.success){
                alert(`category is deleted`);
                getAllCategory();
            }
            else{
                alert(data.message);
            }
            
        } catch (error) {
            console.log(error);
            alert("Smtng went wrong");
            
        }
    }
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                
                <div className='row'>

                    {/* for menu on the left */}
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    {/* for details on right */}
                    <div className='col-md-9'>
                        <h1>Manage Locations</h1>

                        {/* a form to add/ create */}
                        <div className='p-3'>
                            <CategoryForm handleSubmit={handleSubmit} value={location} setValue={setLocation}/>
                        </div>

                        {/* table to display all the locations */}
                        <div className='w-75'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c)=>(
                                        <>
                                            <tr>
                                            <td key={c._id}>{c.location}</td>
                                            <td>
                                                <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true); setUpdatedName(c.location);setSelected(c); }}>Edit</button>
                                                <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                                            </td>
                                            </tr>
                                        </>
                                    ) )}
                                </tbody>
                            </table>
                        </div>

                        {/* modal functionality */}
                        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory