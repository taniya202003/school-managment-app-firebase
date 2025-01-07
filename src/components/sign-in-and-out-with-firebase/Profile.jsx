import React, { useEffect, useState } from "react";
import "../../assets/profile.css";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { PiHandsPrayingBold } from "react-icons/pi";
import { auth, db } from "./Firebase";

export const Profile = () => {
  const [userDetail, setUserDetail] = useState(null);

  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const fetchDocCollection = doc(db, "users", user.uid); // find data in doc collection
        const findUserInDb = await getDoc(fetchDocCollection); // find data by id in firebase store and get by getDoc()
        console.log(findUserInDb, "findUserInDb");
        if (findUserInDb.exists()) {
          setUserDetail(findUserInDb.data()); // seting data in state
        } else {
          console.log("User not found in the database");
        }
      } else {
        console.log("User is not logged in");
      }
      // onAuthStateChanged() this is to track data in auth that if user is loged out then it does not have any data and when user log in then it will have data and keep track of that data this function is used
      // in it we are creating one more function to get user detail from database
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogOut = async () => {
    try {
      await auth.signOut(); // signOut()  this function is provided by firebase to logout
      toast.success("User has been logged out");
      window.location.href = "/loginwithgoogle"; // navigate to login page when user is logout
    } catch (error) {
      console.log(error.message, "Logging out");
    }
  };

  return (
    <div className="profile-container">
      {userDetail ? (
        <div className="profile-Deatil-Div">
          <img src={userDetail.photo} alt="User Profile" />
          <h1>
            Welcome {userDetail.userName}
            <PiHandsPrayingBold className="hand-logo" />
          </h1>
          <div>
            <p>
              <b>User Email:</b> {userDetail.email}
            </p>
            <button className="logoutBtn" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
