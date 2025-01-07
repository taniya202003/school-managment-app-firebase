import { createContext, useEffect, useState } from "react";
import { auth, db } from "../components/sign-in-and-out-with-firebase/Firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const ContextProvider = createContext();

export const Context = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [invitation, setInvitation] = useState([]);
  const [requests, setRequests] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [acceptedStudent, setAcceptedStudent] = useState([]);
  const [enrolledTeachers, setEnrolledTeachers] = useState([]);
  const [javascriptVideos, setJavascriptVideos] = useState([]);
  const [reactJsVideos, setReactJsVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackBtnToggle, setTrackBtnToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // filter for students data for teacher portal and filter enrolledStudentsData on invitation page
  const filteredUsers = users.filter(
    (user) =>
      !enrolledStudents.some((enrolled) => enrolled?.email === user?.email) &&
      !acceptedStudent.some((accepted) => accepted?.email === user?.email)
  );

  // enrolledTeachersData for student portal and filter enrolledTeachersData on request page
  const enrolledTeachersData = [
    ...(enrolledTeachers?.teachers?.JavaScript || []),
    ...(enrolledTeachers?.teachers?.React_Js || []),
  ];
  const filterUser = users.filter(
    (user) => !enrolledTeachersData.some((final) => final.email === user.email)
  );

  // fetching user by role to login
  const fetchUsersByRole = async (role) => {
    try {
      // Fetch all users
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];

      // Fetch all blocked users once
      const blockedUsersSnapshot = await getDocs(
        collection(db, "blockedUsers")
      );
      const blockedUserIds = new Set(); // This set will hold the IDs of blocked users // new creates a new object and Set() is used to ignore value that are repetive or duplicate

      // Populate the Set with blocked user IDs
      blockedUsersSnapshot.forEach((doc) => {
        // forEach iterates through each document in blockedUsersSnapshot  and adds its ID to the set
        blockedUserIds.add(doc.id); // Add each blocked user ID to the Set
      });

      // Iterate through the user documents
      querySnapshot.forEach((userDoc) => {
        const user = userDoc.data(); // retrieves the user data

        // Check if the user role matches and the user is not blocked
        if (user.role === role && !blockedUserIds.has(userDoc.id)) {
          usersData.push({ ...user, id: userDoc.id }); // Add to the list if not blocked
        }
      });
      // .has() is used with objects to check whether a given key exists in an object
      //  - Suppose you have an object called `myObject`.
      //  - You can use `myObject.has(key)` to determine if `key` is a property (or key) in `myObject`.
      //  - If the key exists, `.has()` returns `true`; otherwise, it returns `false`.

      setUsers(usersData); // Set the filtered user list in state
    } catch (error) {
      console.error("Error fetching users by role:", error);
    }
  };

  // fetching current logged in user
  const fetchCurrentUser = async () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setCurrentUserProfile(userDoc.data());
          }
        } else {
          setCurrentUserProfile(null);
          toast.error("No user is logged in");
        }
      });
    } catch (error) {
      console.log("Error fetching current user profile", error.message);
    }
  };

  // Handle logout 
  const handleLogOut = async () => {
    try {
      await auth.signOut(); // signOut()  this function is provided by firebase to logout
      // toast.success("User has been logged out");
      window.location.href = "/loginwithgoogle"; // navigate to login page when user is logout
    } catch (error) {
      console.log(error.message, "Logging out");
    }
  };

  // Block user by admin
  const blockUser = async (index) => {
    const userToBlock = users[index];
    try {
      const currentUser = auth.currentUser;

      const blockedUserDocRef = doc(db, "blockedUsers", userToBlock.id);
      await setDoc(blockedUserDocRef, {
        currentUserUid: currentUser.uid,
        userName: userToBlock.userName,
        email: userToBlock.email,
        role: userToBlock.role,
        photo: userToBlock.photo,
        blocked: true,
      });
      setUsers(users.filter((_, i) => i !== index)); // Remove the blocked user
      setBlockedUser([...blockedUser, { ...userToBlock, blocked: true }]); // Add the blocked user to the block list
      toast.info(`${userToBlock.userName} has been Blocked`);
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  // UnBlock user by admin
  const unBlockUser = async (index) => {
    const userToUnBlock = blockedUser[index];
    try {
      const blockUserDocRef = doc(db, "blockedUsers", userToUnBlock.id);
      await deleteDoc(blockUserDocRef);
      setBlockedUser(blockedUser.filter((_, i) => i !== index));
      setUsers([...users, { ...userToUnBlock, blocked: false }]);
      toast.info(`${userToUnBlock.userName} has been Un Blocked`);
    } catch (error) {
      console.log("Error Unblocking user:", error);
    }
  };

  // fetching blocked users
  const fetchBlockedUsers = async () => {
    try {
      setLoading(true);
      const blockedUser = collection(db, "blockedUsers");
      const blockedUserQuery = query(
        blockedUser,
        where("currentUserUid", "==", auth.currentUser.uid)
      );
      const getUsers = await getDocs(blockedUserQuery);
      const blockedUserList = getUsers.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlockedUser(blockedUserList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message, "error in fetching blocked user by admin");
    }
  };

  // Remove user by admin
  const removeUser = async (index) => {
    const removeUser = users[index];
    const userDocRef = doc(db, "users", removeUser.id);
    try {
      await deleteDoc(userDocRef);
      setUsers(users.filter((_, i) => i !== index));
      toast.info(`${removeUser.userName} has been removed`);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  // assign subject by admin
  const assignSubject = async (index, subject) => {
    const assignSubject = users[index];
    const userDocRef = doc(db, "users", assignSubject.id);

    try {
      await updateDoc(userDocRef, { subject });
      const updatedUsers = users.map((user, i) =>
        i === index ? { ...user, subject } : user
      );
      setUsers(updatedUsers);
      toast.success(`${subject} assigned to ${assignSubject.userName}`);
    } catch (error) {
      console.log("Error assigning subjct", error);
    }
  };

  // send Invitations to students from teachers
  const sendInvitations = async (index) => {
    const student = filteredUsers[index];
    try {
      const currentUser = auth.currentUser; // cureent loged in teacher data
      if (currentUser) {
        await setDoc(
          doc(db, "invitations", `${currentUser.uid}_${student.uid}`),
          {
            teacherUid: currentUser.uid, //teachers id
            from: currentUserProfile.userName || null,
            email: student.email || null,
            photo: currentUserProfile.photo || null,
            subject: currentUserProfile.subject || null,
            message:
              "Would you like to join my class, if yes then make sure to click on accept button!" ||
              null,
            status: "Pending",
          }
        );
      }

      // btn toggle
      setInvitation((prev) => {
        const updateDoc = [...prev];
        updateDoc[index] = true;
        return updateDoc;
      });
      setTrackBtnToggle(true);
      toast.success(`Invitation sent to ${student.userName}`);
    } catch (error) {
      console.log("Error in sending invitations", error);
    }
  };

  // invitations list on students portal
  const invitationResponse = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const invitations = collection(db, "invitations"); // Reference to the invitations collection in Firestore
        const invitationQuery = query(
          invitations,
          where("email", "==", currentUser.email),
          where("status", "==", "Pending")
        );
        const fetchInvitations = await getDocs(invitationQuery); // Fetch the invitations

        const invitationList = fetchInvitations.docs.map((doc) => ({
          // Map the fetched invitations and set them in the state
          id: doc.id,
          ...doc.data(),
        }));
        console.log(invitationList, "invitationList");
        setInvitation(invitationList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching invitations:", error);
    }
  };

  // accept invitation btn on students portal
  const acceptInvitation = async (index) => {
    const invitationIndex = invitation[index];
    try {
      const enrolledStudent = auth.currentUser;
      if (enrolledStudent) {
        await addDoc(collection(db, "enrolledStudents"), {
          photo: currentUserProfile.photo || null,
          userName: currentUserProfile.from || null,
          email: currentUserProfile.email || null,
          enrolledSubject: invitationIndex.subject || null,
          teacherUid: invitationIndex.teacherUid,
        });
      }

      // update invitaions list so that after response that invitation wil not be visible
      const invitationDoc = doc(db, "invitations", invitationIndex.id);
      await updateDoc(invitationDoc, { status: "Accepted" });

      setInvitation((prev) => prev.filter((_, i) => i !== index));

      toast.success(
        `you have successfully accepted ${invitationIndex.from}'s invitation`
      );
    } catch (error) {
      console.error("Error in accepting invitations:", error);
    }
  };

  // const acceptInvitation = async (index) => {
  //   const invitationIndex = invitation[index];
  //   try {
  //     const enrolledStudent = auth.currentUser;
  //     if (enrolledStudent) {
  //       await setDoc(doc(db, "enrolledStudents", invitationIndex.teacherUid), {
  //         photo: currentUserProfile.photo || null,
  //         userName: currentUserProfile.userName || null,
  //         email: currentUserProfile.email || null,
  //         enrolledSubject: invitationIndex.subject || null,
  //         studentUid: enrolledStudent.uid || null,
  //       });
  //     }

  //     // update invitaions list so that after response that invitation wil not be visible
  //     const invitationDoc = doc(db, "invitations", invitationIndex.id);
  //     await updateDoc(invitationDoc, { status: "Accepted" });

  //     setInvitation((prev) => prev.filter((_, i) => i !== index));

  //     toast.success(
  //       `you have successfully accepted ${invitationIndex.from}'s invitation`
  //     );
  //   } catch (error) {
  //     console.error("Error in accepting invitations:", error);
  //   }
  // };

  // reject invitation btn on students portal
  const rejectInvitation = async (index) => {
    const invitationIndex = invitation[index];
    try {
      const invitationDoc = doc(db, "invitations", invitationIndex.id);
      await updateDoc(invitationDoc, { status: "Rejected" });

      setInvitation((prev) => prev.filter((_, i) => i !== index));

      // update btn text
      setTrackBtnToggle((prev) => {
        if (Array.isArray(prev)) {
          const updatedStatus = [...prev];
          updatedStatus[index] = "Rejected";
          return updatedStatus;
        }
      });
      toast.error(`You have rejected ${invitationIndex.userName}'s invitation`);
    } catch (error) {
      console.error("Error in rejecting invitations:", error);
    }
  };

  // enrolled students data on teacher portal
  const enrolledStudent = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const enrolledStudent = collection(db, "enrolledStudents");
        const enrollementQuery = query(
          enrolledStudent,
          where("teacherUid", "==", currentUser.uid)
        );

        const fetchEnrolledStudent = await getDocs(enrollementQuery);

        const studentList = fetchEnrolledStudent.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(studentList, " enrolled studentLis ");
        setEnrolledStudents(studentList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in enrollement of student ", error);
    }
  };

  // send requests from student to teacher
  const sendRequests = async (index) => {
    const teacherIndex = filterUser[index];
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await setDoc(
          doc(db, "requests", `${currentUser.uid}_${teacherIndex.uid}`),
          {
            studentUid: currentUser.uid || null, // current logged in student id
            from: currentUserProfile.userName || null,
            email: teacherIndex.email || null,
            studentEmail: currentUserProfile.email || null,
            photo: currentUserProfile.photo || null,
            message:
              "Hi, just came across your profile and i would love to join this class. So, please give me permission to attend this class.",
            status: "Pending",
          }
        );

        // btn toggle
        setRequests((prev) => {
          const updateDoc = [...prev];
          updateDoc[index] = true;
          return updateDoc;
        });
      }

      setTrackBtnToggle(true);
      toast.success(`Request sent to ${teacherIndex.userName}`);
    } catch (error) {
      console.log("Error in sending request", error);
    }
  };

  // fetchrequests list in teacher portal
  const requestsResponse = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;

      if (currentUser) {
        const requests = collection(db, "requests");
        const requestsQuery = query(
          requests,
          where("email", "==", currentUser.email),
          where("status", "==", "Pending")
        );
        const fetchRequests = await getDocs(requestsQuery);
        const requestsList = fetchRequests.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in requests response", error);
    }
  };

  // accept request by teacher
  const acceptRequest = async (index) => {
    const indexOfRequest = requests[index];
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Use addDoc to generate a unique document ID
        await addDoc(collection(db, "acceptedStudent"), {
          photo: indexOfRequest.photo || null,
          userName: indexOfRequest.from || null,
          email: indexOfRequest.studentEmail || null,
          teacherUid: currentUser.uid || null,
          enrolledSubject: currentUserProfile.subject || null,
        });

        // Update the status of the request to 'Accepted'
        const updateRequestDoc = doc(db, "requests", indexOfRequest.id);
        await updateDoc(updateRequestDoc, { status: "Accepted" });

        // Update state to remove the request and add the accepted student
        setRequests((prev) => prev.filter((_, i) => i !== index));
        setAcceptedStudent([...acceptedStudent, indexOfRequest]);

        toast.success(`${indexOfRequest.from}'s request has been accepted`);

        acceptedStudentList(); // Refetch data after accepting a request
      }
    } catch (error) {
      console.error("Error in accepting request:", error);
    }
  };

  // reject request by teacher
  const rejectRequest = async (index) => {
    const indexOfRequest = requests[index];

    try {
      const updateRequestDoc = doc(db, "requests", indexOfRequest.id);
      await updateDoc(updateRequestDoc, { status: "Rejected" });

      setRequests((prev) =>
        Array.isArray(prev) ? prev.filter((_, i) => i !== index) : []
      );

      // update btn text
      setTrackBtnToggle((prev) => {
        if (Array.isArray(prev)) {
          const updatedStatus = [...prev];
          updatedStatus[index] = "Rejected";
          return updatedStatus;
        }
        return []; // Ensure it returns an array
      });
      toast.error(`You have rejected ${indexOfRequest.userName}'s request!`);
    } catch (error) {
      console.error("Error in rejecting request:", error);
    }
  };

  // accepted requests Students List
  const acceptedStudentList = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const acceptedStudents = collection(db, "acceptedStudent");
        const enrollementQuery = query(
          acceptedStudents,
          where("teacherUid", "==", currentUser.uid)
        );

        const fetchEnrolledStudent = await getDocs(enrollementQuery);
        const studentList = fetchEnrolledStudent.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(studentList, "studentList");
        setAcceptedStudent(studentList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in enrollment of student ", error);
    }
  };

  // fetch enrolled students subject data
  const fetchEnrolledSubject = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Enrolled students query collection for both subjects
        const enrolledRef = collection(db, "enrolledStudents");
        const queryEnroll = query(
          enrolledRef,
          where("email", "==", currentUser.email)
        );
        const enrolledDocs = await getDocs(queryEnroll);
        const studentList = enrolledDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // -----------------------------------------------------------------------
        const enrolledRef2 = collection(db, "acceptedStudent");
        const queryEnroll2 = query(
          enrolledRef2,
          where("email", "==", currentUser.email)
        );
        const enrolledDocs2 = await getDocs(queryEnroll2);
        const studentList2 = enrolledDocs2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // --------------------------------------------------------------------------
        const combinedList = [...studentList, ...studentList2];
        const teacherMap = {}; // Map to hold teachers by subject

        // Collect all unique teacher UIDs from the combined student list
        combinedList.forEach((student) => {
          if (student.teacherUid && student.enrolledSubject) {
            const { teacherUid, enrolledSubject } = student;

            // Initialize the array for each subject if it doesn't exist
            if (!teacherMap[enrolledSubject]) {
              teacherMap[enrolledSubject] = new Set(); // Use a Set to avoid duplicates
            }
            teacherMap[enrolledSubject].add(teacherUid); // Add the teacher UID to the corresponding subject
          }
        });

        // Fetch teacher data for each unique teacher UID grouped by subject
        const subjectTeachers = await Promise.all(
          Object.keys(teacherMap).map(async (subject) => {
            const teacherUids = Array.from(teacherMap[subject]); // Convert Set to Array

            const teachers = await Promise.all(
              teacherUids.map(async (teacherUid) => {
                const teacherRef = doc(db, "users", teacherUid);
                const teacherSnap = await getDoc(teacherRef);

                if (teacherSnap.exists()) {
                  return {
                    subject, // Associate the teacher with the subject
                    data: teacherSnap.data(), // Include the teacher data
                  };
                }
                return null; // Return null if no teacher found
              })
            );

            // Filter out null values
            return {
              subject,
              teachers: teachers
                .filter((teacher) => teacher !== null)
                .map((t) => t.data), // Return only the teacher data
            };
          })
        );

        // Create a structured object for teachers by subject where keys are subjects and values are arrays of teachers
        const result = subjectTeachers.reduce((acc, { subject, teachers }) => {
          acc[subject] = teachers;
          return acc;
        }, {});

        return {
          teachers: result, // Return an object where keys are subjects and values are arrays of teachers
        };
      }
    } catch (error) {
      console.error(
        error.message,
        "error in fetching enrolled/accepted student subject"
      );
    }
  };

  // fetch videos from firestore
  const fetchVideos = async () => {
    try {
      const javascriptVideosCollection = await getDocs(
        query(collection(db, "javascriptVideos"), orderBy("createdAt"))
      );
      const reactJsVideosCollection = await getDocs(
        query(collection(db, "reactJsVideos"), orderBy("createdAt"))
      );

      const javascriptVideosData = javascriptVideosCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const reactJsVideosData = reactJsVideosCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJavascriptVideos(javascriptVideosData);
      setReactJsVideos(reactJsVideosData);
    } catch (error) {
      console.error("Error in fetching video from Firestore: ", error.message);
    }
  };

   // add new videos
  const addNewVideo = async (url, subject) => {
    const newVideo = {
      title: `Video ${subject === "JavaScript" ? javascriptVideos.length + 1 : reactJsVideos.length + 1}`,
      url: url,
      createdAt: serverTimestamp(), // Adding timestamp //it is used to store the exact server time in your documents
    };

    if (subject === "JavaScript") {
      setJavascriptVideos((prev) => [...prev, newVideo]);
    } else {
      setReactJsVideos((prev) => [...prev, newVideo]);
    }

    await addVideoToFireStore(newVideo, subject);
  };

  // add videos to firestore
  const addVideoToFireStore = async (video, subject) => {
    try {
      const videosCollection = collection(
        db,
        subject === "JavaScript" ? "javascriptVideos" : "reactJsVideos"
      );
      await addDoc(videosCollection, video);
    } catch (error) {
      console.error("Error in adding video to fire store: ", error.message);
    }
  };

  return (
    <ContextProvider.Provider
      value={{
        loading,
        users,
        setUsers,
        blockedUser,
        activeTab,
        setActiveTab,
        currentUserProfile,
        setCurrentUserProfile,
        invitation,
        setInvitation,
        trackBtnToggle,
        enrolledStudents,
        requests,
        acceptedStudent,
        enrolledTeachers,
        setEnrolledTeachers,
        javascriptVideos,
        setJavascriptVideos,
        reactJsVideos,
        setReactJsVideos,
        fetchUsersByRole,
        fetchCurrentUser,
        handleLogOut,
        blockUser,
        unBlockUser,
        fetchBlockedUsers,
        removeUser,
        assignSubject,
        sendInvitations,
        invitationResponse,
        acceptInvitation,
        rejectInvitation,
        enrolledStudent,
        sendRequests,
        requestsResponse,
        acceptRequest,
        rejectRequest,
        acceptedStudentList,
        filteredUsers,
        filterUser,
        fetchEnrolledSubject,
        addNewVideo,
        fetchVideos,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
