import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className='list-group'>
                    <h4>Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" aria-current="true">Profile</NavLink>
                    <NavLink to="/dashboard/user/reviews" className="list-group-item list-group-item-action" aria-current="true">Reviews</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu