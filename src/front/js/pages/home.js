import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
	  name: '',
	  email: '',
	  password: '',
	  confirmPassword: ''
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: value
		}));
	  };
	  const handleSubmit = (e) => {
		e.preventDefault();
		// Add signup logic here
		console.log('Signup data:', formData);
	  };
	return (
		<div className="min-h-screen flex items-center justify-center bg-white p-4">
		<div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden flex">
		  {/* Left Side - Description */}
		  <div className="w-1/2 bg-[#E6EDF3] p-8 flex flex-col justify-center">
			<h2 className="text-2xl font-bold text-[#24292F] mb-4">Become a member</h2>
			<p className="text-[#57606A]">
			  Onmino helps you organize your ideas, tasks, and projects simply and efficiently. Start today!
			</p>
		  </div>
  
		  {/* Right Side - Signup Form */}
		  <div className="w-1/2 p-8 bg-white">
			<form onSubmit={handleSubmit}>
			  <div className="mb-4">
				<input 
				  type="text"
				  name="name"
				  placeholder="Name"
				  value={formData.name}
				  onChange={handleInputChange}
				  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
				  required
				/>
			  </div>
			  <div className="mb-4">
				<input 
				  type="email"
				  name="email"
				  placeholder="Email"
				  value={formData.email}
				  onChange={handleInputChange}
				  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
				  required
				/>
			  </div>
			  <div className="mb-4 relative">
				<input 
				  type={showPassword ? "text" : "password"}
				  name="password"
				  placeholder="Password"
				  value={formData.password}
				  onChange={handleInputChange}
				  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
				  required
				/>
				<button
				  type="button"
				  onClick={() => setShowPassword(!showPassword)}
				  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#57606A]"
				>
				  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			  </div>
			  <div className="mb-4 relative">
				<input 
				  type={showPassword ? "text" : "password"}
				  name="confirmPassword"
				  placeholder="Confirm Password"
				  value={formData.confirmPassword}
				  onChange={handleInputChange}
				  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
				  required
				/>
			  </div>
			  <button 
				type="submit" 
				className="w-full bg-[#1F6FEB] text-white py-2 rounded-md hover:bg-[#1160D3] transition duration-300"
			  >
				Register
			  </button>
			</form>
		  </div>
		</div>
	  </div>
	);
  };