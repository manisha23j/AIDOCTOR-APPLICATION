import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import UsersList from "./pages/admin/UsersList";
import DoctorsList from "./pages/admin/DoctorsList";
import Profile from "./pages/Doctor/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import UserProfile from "./pages/UserProfile"
import SendMessage from "./pages/SendMessage";
import Messages from "./pages/Messages";
import HealthChatBot from "./pages/Prompt";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-grow" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/userslist"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctorslist"
            element={
              <ProtectedRoute>
                <DoctorsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompt"
            element={
              <ProtectedRoute>
                <HealthChatBot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send-message/:doctorName/:doctorId"
            element={
              <ProtectedRoute>
                <SendMessage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages/:id"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
