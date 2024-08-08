import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className='list-group'>
                    <h4> Admin Panel</h4>
                    <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action" aria-current="true">Add Locations</NavLink>
                    <NavLink to="/dashboard/admin/add-restaurant" className="list-group-item list-group-item-action" aria-current="true">Add Restaurant</NavLink>
                    <NavLink to="/dashboard/admin/all-restaurant" className="list-group-item list-group-item-action" aria-current="true">All restaurants</NavLink>
                    <NavLink to="/dashboard/admin/all-users" className="list-group-item list-group-item-action" aria-current="true">All users</NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu