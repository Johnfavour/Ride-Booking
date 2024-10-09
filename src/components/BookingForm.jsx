import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 



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

  // Fetch weather for the pickup location
  useEffect(() => {
    if (pickup) {
      fetchWeather(pickup)
        .then((data) => setPickupWeather(data))
        .catch(() => toast.error("Error fetching weather for pickup location"));
    }
  }, [pickup]);

  // Fetch weather for the destination location
  useEffect(() => {
    if (destination) {
      fetchWeather(destination)
        .then((data) => setDestinationWeather(data))
        .catch(() =>
          toast.error("Error fetching weather for destination location")
        );
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
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Editing the booking handler
  const handleEdit = (booking) => {
    setPickup(booking.pickup);
    setDestination(booking.destination);
    setDate(booking.date);
    setTime(booking.time);
    setIsEditing(booking.id); 
    setIsBookingSubmitted(false); 
  };

  // Delete the booking handler
  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    toast.success("Booking cancelled!");
  };

  const handleNewBooking = () => {
    setIsBookingSubmitted(false); 
  };

  return (
    <div className="flex items-center justify-center ">
      <ToastContainer />
      {isBookingSubmitted ? (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Booking Summary</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet</p>
        ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id} className="p-4 border-b">
                  <p>Pickup: {booking.pickup}</p>
                  <p>Destination: {booking.destination}</p>
                  <p>Date: {booking.date}</p>
                  <p>Time: {booking.time}</p>
                  <button
                    className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300 mt-5 "
                    onClick={() => handleEdit(booking)}
                    >
                    Edit
                    </button>
                    <button
                    className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-3 hover:bg-red-700 transition-colors duration-300"
                    onClick={() => handleDelete(booking.id)}
                    >
                    Delete
                </button>
                </li>
              ))}
            </ul>
          )}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-gray-800"
            onClick={handleNewBooking}
          >
            New Booking
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="bg-gray-700 p-6 rounded-3xl shadow-md space-y-4"
        >
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
                <label className="text-gray-300 mb-1">Select Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-2xl px-4 py-2 w-full cursor-pointer" // Add cursor-pointer for visual feedback
                />
                </div>

                <div className="mb-4">
                <label className="text-gray-300 mb-1">Select Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border rounded-2xl px-4 py-2 w-full cursor-pointer" // Add cursor-pointer for visual feedback
                />
                </div>

           {/* <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-2xl px-4 py-2 w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded-2xl px-4 py-2 w-full"
          />  */}
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
