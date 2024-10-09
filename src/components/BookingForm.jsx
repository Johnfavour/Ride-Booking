import { useState, useEffect, useRef } from "react";
import { fetchWeather } from "../services/weatherService";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import BookingSummary from './BookingSummary'; 

const BookingForm = ({ handleSubmit }) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickupWeather, setPickupWeather] = useState(null);
  const [destinationWeather, setDestinationWeather] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [bookings, setBookings] = useState([]); 
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false); 
  const [lastError, setLastError] = useState(null); 

  const typingTimeoutRef = useRef(null);

  


  const showErrorOnce = (message) => {
    if (lastError !== message) {
      setLastError(message);
      toast.error(message);
    }
  };

  const debouncedFetchWeather = (location, setWeatherState) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      fetchWeather(location)
        .then((data) => setWeatherState(data))
        .catch(() => showErrorOnce(`Error fetching weather for ${location}`));
    }, 1000); 
  };

  useEffect(() => {
    if (pickup) {
      debouncedFetchWeather(pickup, setPickupWeather);
    }
  }, [pickup]);

  useEffect(() => {
    if (destination) {
      debouncedFetchWeather(destination, setDestinationWeather);
    }
  }, [destination]);

  const validateForm = () => {
    if (!pickup || !destination || !date || !time) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    if (new Date(date) < new Date()) {
      toast.error("The selected date cannot be in the past.");
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const booking = { pickup, destination, date, time };
      
      if (isEditing) {
        const updatedBookings = bookings.map((b) =>
          b.id === isEditing ? booking : b
        );
        setBookings(updatedBookings);
        toast.success("Booking updated successfully!");
        setIsEditing(false);
      } else {
        setBookings([...bookings, { ...booking, id: Date.now() }]);
        toast.success("Booking successful!");
      }

      setPickup("");
      setDestination("");
      setDate("");
      setTime("");
      setIsBookingSubmitted(true);
    } catch (err) {
      toast.error(`Something went wrong. Please try again: ${err.message}`);
    }
  };

  const handleEdit = (booking) => {
    setPickup(booking.pickup);
    setDestination(booking.destination);
    setDate(booking.date);
    setTime(booking.time);
    setIsEditing(booking.id); 
    setIsBookingSubmitted(false); 
  };

  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    toast.success("Booking cancelled!");
  };

  const handleNewBooking = () => {
    setIsBookingSubmitted(false); 
    setPickupWeather(null); 
    setDestinationWeather(null);
  };

  return (
    <div className="flex items-center justify-center ">
      <ToastContainer />
      {isBookingSubmitted ? (
        <BookingSummary 
          bookings={bookings}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNewBooking={handleNewBooking}
        />
      ) : (
        <form onSubmit={onSubmit} className="bg-gray-700 p-6 rounded-3xl shadow-md space-y-4">
          <div>
            <label className="text-gray-300 mb-1">Pickup Location</label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="border rounded-2xl px-4 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-gray-300 mb-1">Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border rounded-2xl px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-2xl px-4 py-2 w-full cursor-pointer" 
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-300 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded-2xl px-4 py-2 w-full cursor-pointer" 
            />
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-full"
          >
            {isEditing ? "Update Booking" : "Book Ride"}
          </button>

          {pickupWeather && (
            <div className="text-white">
              <h3>Pickup Weather:</h3>
              <p>Temperature: {pickupWeather.main.temp} °C</p>
              <p>Condition: {pickupWeather.weather[0].description}</p>
            </div>
          )}

          {destinationWeather && (
            <div className="text-white">
              <h3>Destination Weather:</h3>
              <p>Temperature: {destinationWeather.main.temp} °C</p>
              <p>Condition: {destinationWeather.weather[0].description}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default BookingForm;
