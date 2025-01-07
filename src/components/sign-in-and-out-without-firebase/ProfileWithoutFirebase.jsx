import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const ProfileWithoutFirebase = () => {
  const [userDetail,setUserDetail] = useState([])

console.log(userDetail, "userDetail")

  useEffect(()=>{
    const getUserDetails = JSON.parse(localStorage.getItem("users")) || []
    setUserDetail(getUserDetails)
  },[])

  const handleLogout = () => {
    localStorage.removeItem("users")
    toast.success("User has been Logged Out")
    window.location.href="/login"

  }

  return (
    <div>
{userDetail.length > 0 ? (
  userDetail.map((user, i)=>(
    <div key={i}>
  <h1>Welcome {user?.userName} </h1>
  <p> <b>User Email:</b> {user?.email}</p>
<button onClick={handleLogout}>
  Logout
</button>
    </div>
  ))
) : (
 <p> Loading...</p>
) 

}
    </div>
  )
}

