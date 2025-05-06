import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import MyNavbar from "./Components/MyNavbar";
import PagError from "./Components/PagError";
import Home from "./Components/Home";
import MyFooter from "./Components/MyFooter";
import AuthProvider from "./Components/AuthProvider";
import TripsPage from "./Components/TripsPage";
import TripDetailsPage from "./Components/TripDetailsPage";
import BookingSuccessPage from "./Components/BookingSuccessPage";
import EditTripPage from "./Components/EditTripPage";
import CreateTripPage from "./Components/CreateTripPage";
import MyBookingsPage from "./Components/MyBookingsPage";
import ManageBookingsPage from "./Components/ManageBookingsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <>
      <MyNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PagError />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripDetailsPage />} />
          <Route path="/edit-trip/:id" element={<EditTripPage />} />
          <Route path="/create-trip" element={<CreateTripPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/admin/bookings" element={<ManageBookingsPage />} />
        </Routes>
      </Container>
      <MyFooter />
    </>
  );
}

export default App;
