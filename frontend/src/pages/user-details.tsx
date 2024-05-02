import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const dummyUsers: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phoneNumber: "+9876543210",
  },
] 

const UserDetailsPage: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [userData, setUserData] = useState<User | null>(null)

 useEffect(() => {
   if (!isAuthenticated) return // Don't fetch if not authenticated

   // Using some dummy data for now (to be replaced with API call)
   const user: string | any = dummyUsers.find((u) => u.email === user!.email)
   setUserData(user ? user : null) 
 }, [isAuthenticated, user])


  return (
    <div className="container mx-auto px-4 py-8">
      {isAuthenticated ? (
        userData ? (
          <div className="shadow-md rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider py-4 px-6 border-b border-gray-200">
                  <th className="whitespace-nowrap">Field</th>
                  <th className="whitespace-nowrap">Value</th>
                  <th className="whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <td className="px-6 py-4 text-sm">First Name</td>
                  <td className="px-6 py-4 text-sm">{userData.firstName}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 text-xs font-bold leading-none rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      // edit functionality here
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 text-xs font-bold leading-none rounded-md text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      // delete functionality here
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <td className="px-6 py-4 text-sm">Last Name</td>
                  <td className="px-6 py-4 text-sm">{userData.lastName}</td>
                  <td className="px-6 py-4 text-right"></td>
                </tr>
                <tr className="hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <td className="px-6 py-4 text-sm">Email Address</td>
                  <td className="px-6 py-4 text-sm">{userData.email}</td>
                  <td className="px-6 py-4 text-right"></td>
                </tr>
                ... (code from previous response)
                <tr className="hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <td className="px-6 py-4 text-sm">Phone Number</td>
                  <td className="px-6 py-4 text-sm">{userData.phoneNumber}</td>
                  <td className="px-6 py-4 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading user details...</p>
        )
      ) : (
        <p>Please login to view your details.</p>
      )}
    </div>
  )
}

export default UserDetailsPage
