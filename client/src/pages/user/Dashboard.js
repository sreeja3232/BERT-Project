import React from 'react'
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div  >
                            <h4>User Name : {auth?.user?.name} </h4>
                            <h4>User Email : {auth?.user?.email} </h4>
                            <h4>User Addres : {auth?.user?.address} </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
