import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore"; // Import getDoc for fetching user data
import { useNavigate } from "react-router-dom";

export const Google = () => {
  const navigate = useNavigate();

  const handleSigninWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Check if user already exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // User exists, check their role and navigate accordingly
          const userData = userDoc.data();
          const role = userData.role;
          console.log(role, "role");
          if (role === "ADMIN") {
            navigate("/adminPortal");
          } else if (role === "TEACHER") {
            navigate("/teachersPortal");
          } else if (role === "STUDENT") {
            navigate("/studentsPortal");
          } else {
            toast.error("User data not found");
          }
        } else {
          // New user, set default role and save user data to Firestore
          const defaultRole = "STUDENT"; // Set default role as student

          await setDoc(doc(db, "users", user.uid), {
            email: user.email || null,
            userName: user.displayName || null,
            photo: user.photoURL || null,
            role: defaultRole || null, // Save default role
          });

          // Navigate to default role's portal
          // setTimeout(() => navigate("/profileB"), 2000);
        }
        toast.success("User Logged In Successfully");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <div className="login-googleSignIn-Div-f">
        <p className="login-googleSignIn-p">or Login With</p>
        <button className="login-google-btn" onClick={handleSigninWithGoogle}>
          <FaGoogle size={16} color="white" />
        </button>
      </div>
    </div>
  );
};
