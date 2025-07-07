import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import LandingPage from "../pages/LandingPage"
import SignUp from "../Component/SignUpFirstStep"
import SignIn from "../pages/SignIn"
import SignUpSecondStep from "../Component/SignUpSecondStep"
import SubmitIdeaForm from "../pages/SubmitIdeaForm"
import MyIdeas from "../pages/MyIdeas"
import AllIdeas from "../pages/ExploreStartupIdeas"
import IdeaAnalysis from "../pages/IdeaAnalysis"
import IdeaDetails from "../pages/IdeaDetails"
import ScheduleMeetingForm from "../Component/RequestMeetingModal"
import SignUpForm from "../pages/SignUp"
import AdminLogin from "../admin/pages/AdminLogin"
import AdminDashboard from "../admin/pages/AdminDashboard"
import ManageComments from "../admin/pages/ManageComments"
import WatchMeetings from "../pages/WatchMeetings"
import Nav from "../user/components/Nav"
import Support from "../user/components/Support"
import Footer from "../user/components/Footer"
import VentureBoard from "../pages/VentureBoard"
import NavAdmin from "../admin/pages/NavAdmin"
import Landing from "../pages/Landing"
import ReportManagement from "../admin/pages/ReportManagement"




const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer/>
    </>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
     /*  { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/signin", element: <SignIn /> }, */
      { path: "/submitIdea", element: <SubmitIdeaForm /> },
      { path: "/support", element: <Support /> },
      { path: "/MyIdeas", element: <MyIdeas /> },
      { path: "/AllIdeas", element: <AllIdeas /> },
      { path: "/venture-board", element: <VentureBoard /> },
      { path: "/IdeaAnalysis/:id", element: <IdeaAnalysis /> },
      { path: "/detailIdea/:id", element: <IdeaDetails /> },
      { path: "/watchMeeting", element: <WatchMeetings /> },
      //{ path: "/profile", element: <UserProfile/> },
    ],
  },
  {
    path: "/admin",
    
    children: [
      { index: true, element: <AdminLogin /> },
      { path: "adminDashboard", element: <AdminDashboard /> },
      { path: "manageComments", element: <ManageComments /> },
      { path: "manageReport", element: <ReportManagement/>},
    ],
  },
  {
    path: "/",
    children: [
      { index: true, path: "/", element: <Landing /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/signin", element: <SignIn /> },
      { path: "admin", element:  <AdminLogin />   },

    ],
  },
  
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
