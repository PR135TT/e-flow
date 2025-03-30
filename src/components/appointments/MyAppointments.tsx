
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Home,
  MapPin,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Appointment {
  id: string;
  property_id: string;
  property: {
    title: string;
    location: string;
    images: string[];
    price: number;
  };
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "cancelled";
  notes: string;
  created_at: string;
}

export function MyAppointments() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('property_appointments')
          .select(`
            *,
            property: property_id (
              title,
              location,
              images,
              price
            )
          `)
          .eq('user_id', user.id)
          .order('appointment_date', { ascending: true });
          
        if (error) throw error;
        
        setAppointments(data as Appointment[]);
      } catch (error: any) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load your appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const cancelAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('property_appointments')
        .update({ status: 'cancelled' })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the appointments list
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      ));
      
      toast.success("Appointment cancelled successfully");
    } catch (error: any) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success" className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-2">No Appointments</h3>
        <p className="text-gray-500">You haven't scheduled any property viewings yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Appointments</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className={appointment.status === 'cancelled' ? 'opacity-70' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{appointment.property.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {appointment.property.location}
                  </CardDescription>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{format(new Date(appointment.appointment_date), "PPP")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-2" />
                    <span>{appointment.appointment_time}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Notes:</span> {appointment.notes}
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              {appointment.status === 'pending' && (
                <Button 
                  variant="destructive" 
                  onClick={() => cancelAppointment(appointment.id)}
                  className="w-full"
                >
                  Cancel Appointment
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
