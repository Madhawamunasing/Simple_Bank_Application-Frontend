import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
const UserContext = createContext()

export function UserProvider({ children, user, setUser }) {
  useEffect(() => {
    if (localStorage.getItem('v_') != null) {
      var token = localStorage.getItem('v_') || null
      var decoded = jwt_decode(token)
      getUserId(decoded?.sub)
    }
  }, [])
  const getUserId = async (email) => {
    await axios
      .get(`/api/v1/users/getByEmail?email=${email}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('v_'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        let currentUser = res.data[0]
        setUser({
          userId: currentUser?.userId,
          role: currentUser?.role,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
