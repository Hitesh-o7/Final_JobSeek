import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import './signup.css'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (    
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-6">
            <Navbar />
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-xl p-8 mt-[100px] my-10 border border-gray-300">
                <form onSubmit={submitHandler} className="space-y-6">
                    <h1 className="text-3xl font-semibold text-center text-gray-800">Sign Up</h1>

                    {/* Full Name Input */}
                    <div className="mb-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="johndoe@example.com"
                            className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                        />
                    </div>

                    {/* Custom Role Radio Buttons */}
                    <div className="mb-6">
                        <Label>Role</Label>
                        <div className="radio-inputs mt-4">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <span className="name">Student</span>
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <span className="name">Recruiter</span>
                            </label>
                        </div>
                    </div>

                    {/* Profile Picture Input */}
                    <div className="mb-6 flex items-center gap-2">
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button disabled className="w-full bg-blue-500 text-white py-3 rounded-md flex items-center justify-center space-x-2">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors duration-300">
                            Signup
                        </Button>
                    )}

                    {/* Login Link */}
                    <p className="text-sm text-gray-500 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
