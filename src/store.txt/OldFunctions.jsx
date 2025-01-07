// old function and pages code ===============================================================================================

//  old video page code --------
// export const Videos = () => {
//   const { currentUserProfile } = useContext(ContextProvider);
//   const [addVideo, setAddVideo] = useState("")

//   console.log(addVideo,"addVideo")

//   const javascriptVideos = [
//     {
//       title: "Video 1",
//       url: "https://youtu.be/LO5eTH4Pe8E?si=x-s6ngb7rCCb0DSZ",
//     },
//     {
//       title: "Video 2",
//       url: "https://youtu.be/0YFtEZaN6wU?si=5l5r1xZXXeJWd0Qa",
//     },
//     {
//       title: "Video 3",
//       url: "https://youtu.be/3tmpNF0BUdI?si=c0MIlrlr3r2Ylg7C",
//     },
//     {
//       title: "Video 4",
//       url: "https://youtu.be/Qg7H3b1xBfs?si=3nWUG0PcDjfos4_3",
//     },
//     {
//       title: "Video 5",
//       url: "https://youtu.be/4vyxVhaQSxo?si=b3Jz9vlDG1qSQaxB",
//     },
//     {
//       title: "Video 6",
//       url: "https://youtu.be/2hRkqZCEAwo?si=7clL0KBD8oZg9ihK",
//     },
//   ];

//   const reactJsVideos = [
//     {
//       title: "Video 1",
//       url: "https://youtu.be/QFaFIcGhPoM?si=zkrDR5M1GqJ8LeOI",
//     },
//     {
//       title: "Video 2",
//       url: "https://youtu.be/9hb_0TZ_MVI?si=bOECWDcx65cU8bQB",
//     },
//     {
//       title: "Video 3",
//       url: "https://youtu.be/9VIiLJL0H4Y?si=4iBiixg5FEb2FpGD",
//     },
//     {
//       title: "Video 4",
//       url: "https://youtu.be/Y2hgEGPzTZY?si=EfoA0zxYejtC8NtX",
//     },
//     {
//       title: "Video 5",
//       url: "https://youtu.be/Cla1WwguArA?si=EBh3iJbJdrun58Cd",
//     },
//     {
//       title: "Video 6",
//       url: "https://youtu.be/lnV34uLEzis?si=utPlHIx5yGq5vb_J",
//     },
//   ];

//   const isYouTubeUrl = (url) => url.includes("youtu");
//   const getYouTubeEmbedUrl = (url) => {
//     return url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]; // Transform YouTube shareable URL to embed URL
//   };

//   const handleAddVideo = () => {
  
//   }}

//   //.includes() method is a JavaScript method that is used to check if a specific string or element is present in another string or array.
//   // example ;-
//   // let  myString = "Hello, world!";
//   // let searchString = "world";
//   // if (myString.includes(searchString)) {
//   //   console.log("The string includes the word 'world'");
//   // } else {
//   //   console.log("The string does not include the word 'world'");
//   // }

//   console.log(javascriptVideos[0].url, "sgdfash");

//   return (
//     <div className="videos-container">
//       <h2>Videos for {currentUserProfile.subject}</h2>
//       <div className="add-video-div">
//         <form className="add-video-form">
//         <input className="add-video-input" type="text" placeholder="Add Url" value={addVideo} name="addVideo" onChange={(e)=> setAddVideo(e.target.value)}/>
//         <button className="add-video-btn" onClick={handleAddVideo}>Add Video</button>
//         </form>
//       </div>
//       <div className="videos-grid">
//         {currentUserProfile.subject === "JavaScript"
//           ? javascriptVideos.map((vid, i) => (
//               <div key={i}>
//                 <h5>{vid.title}</h5>
//                 {vid?.url ? (
//                   isYouTubeUrl(vid.url) ? (
//                     <iframe
//                       width="350"
//                       height="200"
//                       src={getYouTubeEmbedUrl(vid.url)}
//                       title={vid.title}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   ) : (
//                     <video width="550" height="500" controls>
//                       <source src={vid.url} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   )
//                 ) : (
//                   <p>No video available</p>
//                 )}
//               </div>
//             ))
//           : reactJsVideos.map((vid, i) => (
//               <div key={i}>
//                 <h5>{vid.title}</h5>
//                 {vid?.url ? (
//                   isYouTubeUrl(vid.url) ? (
//                     <iframe
//                       width="350"
//                       height="200"
//                       src={getYouTubeEmbedUrl(vid.url)}
//                       title={vid.title}
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   ) : (
//                     <video width="550" height="500" controls>
//                       <source src={vid.url} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   )
//                 ) : (
//                   <p>No video available</p>
//                 )}
//               </div>
//             ))}
//       </div>
//     </div>
//   );

//from context file ----------
// const fetchEnrolledSubject = async (subject) => {
  //   try {
  //     const currentUser = auth.currentUser;

  //     // Check if the current user and subject are valid
  //     if (currentUser && subject) {
  //       // enrolled students query collection
  //       const enrolledRef = collection(db, "enrolledStudents");
  //       const queryEnroll = query(
  //         enrolledRef,
  //         where("enrolledSubject", "==", subject),
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs = await getDocs(queryEnroll);
  //       const studentList = enrolledDocs.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       const enrolledRef2 = collection(db, "acceptedStudent");
  //       const queryEnroll2 = query(
  //         enrolledRef2,
  //         where("enrolledSubject", "==", subject),
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs2 = await getDocs(queryEnroll2);
  //       const studentList2 = enrolledDocs2.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       const combinedList = [...studentList, ...studentList2];
  //       const enrichedList = await Promise.all(
  //         combinedList.map(async (student) => {
  //           if (student.teacherUid) {
  //             const teacherRef = doc(db, "users", student.teacherUid);
  //             const teacherSnap = await getDoc(teacherRef);

  //             if (teacherSnap.exists()) {
  //               const teacherData = teacherSnap.data();
  //               return {
  //                 teacherData,
  //               };
  //             }
  //           }
  //           // return student; 
  //         })
  //       );

  //       return {
  //         teachers: enrichedList,
  //       };
  //     }
  //   } catch (error) {
  //     console.error(
  //       error.message,
  //       "error in fetching enrolled/accepted student subject"
  //     );
  //   }
  // };

  // const fetchEnrolledSubject = async (subject) => {
  //   try {
  //     const currentUser = auth.currentUser;
  
  //     // Check if the current user and subject are valid
  //     if (currentUser && subject) {
  //       // Enrolled students query collection
  //       const enrolledRef = collection(db, "enrolledStudents");
  //       const queryEnroll = query(
  //         enrolledRef,
  //         where("enrolledSubject", "==", subject),
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs = await getDocs(queryEnroll);
  //       const studentList = enrolledDocs.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       const enrolledRef2 = collection(db, "acceptedStudent");
  //       const queryEnroll2 = query(
  //         enrolledRef2,
  //         where("enrolledSubject", "==", subject),
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs2 = await getDocs(queryEnroll2);
  //       const studentList2 = enrolledDocs2.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       const combinedList = [...studentList, ...studentList2];
  //       const enrichedList = await Promise.all(
  //         combinedList.map(async (student) => {
  //           if (student.teacherUid) {
  //             const teacherRef = doc(db, "users", student.teacherUid);
  //             const teacherSnap = await getDoc(teacherRef);
  
  //             if (teacherSnap.exists()) {
  //               const teacherData = teacherSnap.data();
  //               return teacherData; // Return only teacherData
  //             }
  //           }
  //           return null; // Return null if no teacherUid is present
  //         })
  //       );
  
  //       // Filter out null values
  //       const teachers = enrichedList.filter(teacher => teacher !== null);
  
  //       return {
  //         teachers, // Return only the array of teachers
  //       };
  //     }
  //   } catch (error) {
  //     console.error(
  //       error.message,
  //       "error in fetching enrolled/accepted student subject"
  //     );
  //   }
  // };
  
  // const fetchEnrolledSubject = async () => { // No subject parameter
  //   try {
  //     const currentUser = auth.currentUser;
  
  //     // Check if the current user is valid
  //     if (currentUser) {
  //       // Enrolled students query collection for both subjects
  //       const enrolledRef = collection(db, "enrolledStudents");
  //       const queryEnroll = query(
  //         enrolledRef,
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs = await getDocs(queryEnroll);
  //       const studentList = enrolledDocs.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       const enrolledRef2 = collection(db, "acceptedStudent");
  //       const queryEnroll2 = query(
  //         enrolledRef2,
  //         where("email", "==", currentUser.email)
  //       );
  //       const enrolledDocs2 = await getDocs(queryEnroll2);
  //       const studentList2 = enrolledDocs2.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       const combinedList = [...studentList, ...studentList2];
  //       const teacherUids = new Set(); // To avoid duplicates
  
  //       // Collect all unique teacher UIDs from the combined student list
  //       combinedList.forEach((student) => {
  //         if (student.teacherUid) {
  //           teacherUids.add(student.teacherUid);
  //         }
  //       });
  
  //       // Fetch teacher data for each unique teacher UID
  //       const teachers = await Promise.all(
  //         Array.from(teacherUids).map(async (teacherUid) => {
  //           const teacherRef = doc(db, "users", teacherUid);
  //           const teacherSnap = await getDoc(teacherRef);
  
  //           if (teacherSnap.exists()) {
  //             return teacherSnap.data(); // Return the teacher data
  //           }
  //           return null; // Return null if no teacher found
  //         })
  //       );
  
  //       // Filter out null values
  //       const filteredTeachers = teachers.filter(teacher => teacher !== null);
  
  //       return {
  //         teachers: filteredTeachers, // Return only the array of teachers
  //       };
  //     }
  //   } catch (error) {
  //     console.error(
  //       error.message,
  //       "error in fetching enrolled/accepted student subject"
  //     );
  //   }
  // };

// firebase link 
// https://console.firebase.google.com/u/0/project/login-auth-e2873/firestore/databases/-default-/data/~2FjavascriptVideos~2FN9XS9cE9ySeoT45ZZzk0
