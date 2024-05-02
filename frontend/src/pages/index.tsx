import Image from "next/image";
import { Inter } from "next/font/google";


import React, { useState, useContext } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { AuthContext } from "../context/AuthContext"

const inter = Inter({ subsets: ["latin"] });

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrorMessage("") // Clear error message on input change
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post("/api/login", formData)
      login(response.data)
      router.push("/user-details")
    } catch (error) {
      console.error(error)
      setErrorMessage("Login failed. Please check your email and password.")
    }
  }

  return (
    <div className="container grid place-items-center mx-auto min-h-screen px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
        <div className="hidden lg:grid place-items-center h-full">
          <h1 className="text-5xl font-bold text-center">Hux Assessment</h1>
        </div>
        <div className="flex flex-col sm:flex-grow">
          <h1 className="text-3xl font-bold mb-4 text-center sm:hidden">
            Login
          </h1>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
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
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
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
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 font-medium">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

