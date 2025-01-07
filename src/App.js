import "./App.css";
import { Routes, Route } from "react-router-dom";
// without firebase files -----
import { Login } from "./components/sign-in-and-out-without-firebase/Login";
import { Register } from "./components/sign-in-and-out-without-firebase/Register";
import { ProfileWithoutFirebase } from "./components/sign-in-and-out-without-firebase/ProfileWithoutFirebase";

// with firebase files -----
import { AdminPortal } from "./components/sign-in-and-out-with-firebase/AdminPortal";
import { TeacherPortal } from "./components/sign-in-and-out-with-firebase/TeacherPortal";
import { StudentsPortal } from "./components/sign-in-and-out-with-firebase/StudentsPortal";
import { Profile } from "./components/sign-in-and-out-with-firebase/Profile";
import { LoginWithGoogle } from "./components/sign-in-and-out-with-firebase/LoginWithGoogle";
import { SignInWithGoogle } from "./components/sign-in-and-out-with-firebase/SignInWithGoogle";

// admin portal sidebar files -----
import { AdminDashboard } from "./pages/AdminDashboard";
import { StudentsData } from "./pages/StudentsData";
import { TeachersData } from "./pages/TeachersData";
import { BlockedUsers } from "./pages/BlockedUsers";

// teachers and students portal sidebar files -----
import { TeacherAndStudentDash } from "./components/teacher-and-students-sidebar/TeacherAndStudentDash";
import { Videos } from "./components/teacher-and-students-sidebar/Videos";
import { EnrolledStudents } from "./components/teacher-and-students-sidebar/EnrolledStudents";
import { SendInvitations } from "./components/teacher-and-students-sidebar/SendInvitations";
import { AcceptInvitations } from "./components/teacher-and-students-sidebar/AcceptInvitations";
import { SendRequests } from "./components/teacher-and-students-sidebar/SendRequests";
import { AcceptRequests } from "./components/teacher-and-students-sidebar/AcceptRequests";
import { BlockedStudents } from "./components/teacher-and-students-sidebar/BlockedStudents";
import { JavascriptClasses } from "./components/teacher-and-students-sidebar/JavascriptClasses";
import { ReactjsClasses } from "./components/teacher-and-students-sidebar/ReactjsClasses";
import { TutorialVideos } from "./pages/TutorialVideos";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginWithGoogle />} />
        <Route path="/tutorialVideos" element={<TutorialVideos/>}/>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileA" element={<ProfileWithoutFirebase />} />

        <Route path="/signinwithgoogle" element={<SignInWithGoogle />} />
        <Route path="/loginwithgoogle" element={<LoginWithGoogle />} />
        <Route path="/profileB" element={<Profile />} />

        <Route path="/adminPortal" element={<AdminPortal />}>
          <Route path="adminsDashboard" element={<AdminDashboard />} />
          <Route path="teachersData" element={<TeachersData />} />
          <Route path="studentsData" element={<StudentsData />} />
          <Route path="blockedUsers" element={<BlockedUsers />} />
        </Route>

        <Route path="/teachersPortal" element={<TeacherPortal />}>
          <Route path="teacherDash" element={<TeacherAndStudentDash />} />
          <Route path="videos" element={<Videos />} />
          <Route path="enrolledStudents" element={<EnrolledStudents />} />
          <Route path="sendInvitations" element={<SendInvitations />} />
          <Route path="acceptRequests" element={<AcceptRequests />} />
          <Route path="blockedStudents" element={<BlockedStudents />} />
        </Route>

        <Route path="/studentsPortal" element={<StudentsPortal />}>
        <Route path="studentDash" element={<TeacherAndStudentDash />} />
          <Route path="javascriptClasses" element={<JavascriptClasses />} />
          <Route path="reactjsClasses" element={<ReactjsClasses />} />
          <Route path="sendRequests" element={<SendRequests />} />
          <Route path="acceptInvitations" element={<AcceptInvitations />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
