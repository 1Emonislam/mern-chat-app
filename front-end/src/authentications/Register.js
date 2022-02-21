import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShow = () => setShowPassword(!showPassword);
    const handleImage = () => {

    }
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <div className="h-screen lg:mt-5 w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold">Register</span>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="profile" className="block text-xs mb-1">Profile Picture</label>
                            <input title="Select Profile Picture" className="w-full border rounded  p-2 outline-none focus:shadow-outline" type="file" accept="images/*" name="profile" id="profile"
                                onChange={(e) => handleImage(e.target.files[0])}
                                placeholder="Profile Picture" />
                        </div>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="Name" className="block text-xs mb-1">Name</label>
                            <input className="w-full border rounded  p-2 outline-none focus:shadow-outline" type="text" 
                             {...register("name", { min: 0})}
                            name="name" id="name" placeholder="Full Name"required />
                        </div>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-xs mb-1">Email</label>
                            <input className="w-full border rounded  p-2 outline-none focus:shadow-outline" type="email" 
                             {...register("email", { min: 0})}
                            name="email" id="email" placeholder="Email"required />
                        </div>
                        <div className="mb-2 md:w-full relative">
                            <label htmlFor="password" className="block text-xs mb-1">Password</label>
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" {...register("password", { min: 0})} type={showPassword ? "text" : "password"} name="password" id="password" placeholder={"Password"}required />
                            {showPassword ?
                                <span className="absolute visible right-2 top-8" onClick={handleShow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                </span> :
                                <span className="absolute right-2 top-8" onClick={handleShow}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sm" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg></span>
                            }
                        </div>
                        <div className="mb-2 md:w-full relative">
                            <label htmlFor="password2" className="block text-xs mb-1">Confirm Password</label>
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" {...register("password2", { min: 0})} type={showPassword ? "text" : "password"} name="password2" id="password2" placeholder="Confirm Password" required/>
                            {showPassword ?
                                <span className="absolute right-2 top-8" onClick={handleShow}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg></span> :
                                <span className="absolute right-2 top-8" onClick={handleShow}><svg xmlns="http://www.w3.org/2000/svg" className="text-xs h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg></span>
                            }
                        </div>
                        <button type="submit"className="mt-4 mb-5 bg-green-500 hover:bg-green-700 py-3 text-white uppercase text-sm font-semibold rounded w-full">Register</button>
                        <div className="mt-2 md:w-full text-center text-sm">
                            <span>Already have an account?</span> <Link to="/login" className="text-blue-700 text-center text-sm">Login</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Register;