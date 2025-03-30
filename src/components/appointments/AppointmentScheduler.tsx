
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/App";

interface AppointmentSchedulerProps {
  propertyId: string;
  propertyTitle: string;
}

export function AppointmentScheduler({
  propertyId,
  propertyTitle,
}: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useContext(AuthContext);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    }
  });
  
  // Generate available time slots (9 AM to 5 PM)
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00 ${hour < 12 ? 'AM' : hour === 12 ? 'PM' : 'PM'}`;
  });

  // Min date is today, max date is 30 days from now
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  
  const onSubmit = async (data: any) => {
    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }
    
    if (!user) {
      toast.error("You need to be logged in to schedule an appointment");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Combine date and selected time slot
      const appointmentDateTime = new Date(date);
      const [hourStr, period] = time.split(' ')[0].split(':');
      let hour = parseInt(hourStr);
      
      // Format date for database storage
      const formattedDate = format(appointmentDateTime, "yyyy-MM-dd");
      
      // Create appointment record
      const { error } = await supabase
        .from('property_appointments')
        .insert({
          property_id: propertyId,
          user_id: user.id,
          appointment_date: formattedDate,
          appointment_time: time,
          name: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
          status: 'pending'
        });
      
      if (error) throw error;
      
      // Show success confirmation
      setShowConfirmation(true);
      reset();
      setDate(undefined);
      setTime(undefined);
      
    } catch (error: any) {
      console.error("Error scheduling appointment:", error);
      toast.error(error.message || "Failed to schedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Schedule a Viewing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => 
                  date < minDate || 
                  date > maxDate || 
                  date.getDay() === 0 || // Sunday
                  date.getDay() === 6    // Saturday
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Time</label>
          <Select onValueChange={setTime} value={time}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time">
                {time ? (
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{time}</span>
                  </div>
                ) : (
                  "Select time"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{slot}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input 
              {...register("name", { required: true })}
              placeholder="Full Name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">Name is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input 
              {...register("email", { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              placeholder="Email Address"
              type="email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">Valid email is required</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input 
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">Phone number is required</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Notes (Optional)</label>
          <Textarea 
            {...register("notes")}
            placeholder="Any specific requirements or questions..."
            className="h-24"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !date || !time}
        >
          {isSubmitting ? "Scheduling..." : "Schedule Viewing"}
        </Button>
      </form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Viewing Scheduled!</DialogTitle>
            <DialogDescription>
              Your appointment to view "{propertyTitle}" has been scheduled. 
              We'll notify you once the appointment is confirmed by the property agent.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowConfirmation(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
