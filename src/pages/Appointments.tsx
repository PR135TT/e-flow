
import { Header } from "@/components/Header";
import { MyAppointments } from "@/components/appointments/MyAppointments";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/App";
import { Navigate } from "react-router-dom";

const Appointments = () => {
  const { user } = useContext(AuthContext);

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/signin?redirect=/appointments" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
          <MyAppointments />
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Appointments;
