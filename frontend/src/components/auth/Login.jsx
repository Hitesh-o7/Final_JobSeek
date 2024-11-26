import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import "./signup.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center">
      <Navbar />
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8 my-10 border border-gray-300">
        <form onSubmit={submitHandler} className="space-y-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Login</h1>

          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="patel@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="mt-2 px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>

          {/* Role Selection */}
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

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled
              className="w-full bg-blue-500 text-white py-3 rounded-md flex items-center justify-center space-x-2"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition-colors duration-300"
            >
              Login
            </Button>
          )}

          {/* Sign-up Link */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
