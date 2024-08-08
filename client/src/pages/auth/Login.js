import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Login = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userData = { email, password };
            const res = await axios.post('/auth/login', userData);
            console.log(res);
            if (res && res.data.success) {
                alert("Login Succesful");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))  //storing the data of the current logged in user at the client side
                navigate(location.state || '/');
            }
        }
        catch (error) {
            // toast.error("Invalid user");
            alert("Invalid User");
            console.log(error);
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="register">
                    <h1>Login page</h1>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="form-control"
                            id="exampleInputemail"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                </div>

            </form>

        </Layout>

    )
}

export default Login