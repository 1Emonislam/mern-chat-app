import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    return (
        <>
            <div className="h-screen lg:mt-5 w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold">Forget Password</span>
                    <form className="mb-4" action="/" method="post">
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-xs mb-1">Email</label>
                            <input className="w-full border rounded  p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="mt-2 md:w-full text-center text-sm">
                            <span>Already Have an Account?</span> <Link to="/login" className="text-blue-700 text-center text-sm">Login</Link>
                        </div>
                        <button className="mt-4 mb-5 bg-green-500 hover:bg-green-700 py-3 text-white uppercase text-sm font-semibold rounded w-full">Forget Password</button>
                        
                        <div className="mt-2 md:w-full text-center text-sm">
                            <span>Not a Member?</span> <Link to="/register" className="text-blue-700 text-center text-sm">Register</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default ForgetPassword;