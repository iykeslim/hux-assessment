import React, { useState, useContext } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const { login } = useContext(AuthContext)
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("") 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrorMessage("") 
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post("/api/signup", formData) 
      login(response.data) 
      router.push("/user-details") 
    } catch (error) {
      console.error(error)
      setErrorMessage("Signup failed. Please check your information.")
    }
  }

 return (
   <div className="container mx-auto px-4 py-8">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
       <div className="hidden lg:grid lg:place-items-center h-full">
         <h1 className="text-5xl font-bold text-center">Hux Assessment</h1>
       </div>
       <div className="flex flex-col sm:flex-grow">
         <h1 className="text-3xl font-bold mb-4 text-center sm:hidden">
           Sign Up
         </h1>
         {errorMessage && (
           <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
         )}{" "}
         {/* Display error message if present */}
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           <div className="flex flex-col">
             <label htmlFor="firstName" className="text-sm font-medium mb-2">
               First Name
             </label>
             <input
               type="text"
               id="firstName"
               name="firstName"
               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
               value={formData.firstName}
               onChange={handleChange}
             />
           </div>
           <div className="flex flex-col">
             <label htmlFor="lastName" className="text-sm font-medium mb-2">
               Last Name
             </label>
             <input
               type="text"
               id="lastName"
               name="lastName"
               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
               value={formData.lastName}
               onChange={handleChange}
             />
           </div>
           <div className="flex flex-col">
             <label htmlFor="phoneNumber" className="text-sm font-medium mb-2">
               Phone Number
             </label>
             <input
               type="tel" 
               id="phoneNumber"
               name="phoneNumber"
               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
               value={formData.phoneNumber}
               onChange={handleChange}
             />
           </div>
           <div className="flex flex-col">
             <label htmlFor="email" className="text-sm font-medium mb-2">
               Email Address
             </label>
             <input
               type="email"
               id="email"
               name="email"
               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
               value={formData.email}
               onChange={handleChange}
             />
           </div>
           <div className="flex flex-col">
             <label htmlFor="password" className="text-sm font-medium mb-2">
               Password
             </label>
             <input
               type="password"
               id="password"
               name="password"
               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
               value={formData.password}
               onChange={handleChange}
             />
           </div>
           <button type="submit" className="btn-primary self-center">
             Sign Up
           </button>
         </form>
       </div>
     </div>
   </div>
 )





}

export default SignupPage
