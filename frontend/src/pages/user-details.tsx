import React, { useContext, useEffect, useState } from "react"
import axios from "axios" 
import { AuthContext } from "../context/AuthContext"

const UserDetailsPage: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [userData, setUserData] = useState<{
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
  } | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get("/api/users/" + user._id) 
        //   const response = await axios.get("/api/users/" + user._id) 
          setUserData(response.data)
        } catch (error) {
          console.error(error)
          
        }
      }

      fetchUserDetails()
    }
  }, [isAuthenticated, user]) 

  return (
    <div className="container mx-auto px-4 py-8">
      {isAuthenticated ? (
        userData ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">User Details</h1>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Email: {userData.email}</p>
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
