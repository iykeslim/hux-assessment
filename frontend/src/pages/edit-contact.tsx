import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useRouter } from "next/router";

interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const EditUserPage = () => {
    const router = useRouter();

  const { user, updateUser } = useContext(AuthContext)
  const [userData, setUserData] = useState<User>({} as User)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserData((prevUserDate) => ({ ...prevUserDate, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!userData) return
      updateUser(userData)
      router.push("/user-details");
    } catch (error) {
      console.error(error)
      setError("An error occurred while updating your profile.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return

    setUserData(user)
  }, [user])

  return (
     <div className="container grid place-items-center mx-auto min-h-screen px-4 py-8">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
       <div className="hidden lg:grid lg:place-items-center h-full">
         <h1 className="text-5xl font-bold text-center">Hux Assessment</h1>
       </div>
      {isLoading ? (
        <p>Updating profile...</p>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="inline-close" onClick={() => setError(null)}>
            {" "}
            x
          </span>
          <span className="ml-4">{error}</span>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userData?.firstName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userData?.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userData?.email || ""}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={userData?.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Update Details"}
        </button>
      </form>
    </div>
    </div>
  )
}

export default EditUserPage

