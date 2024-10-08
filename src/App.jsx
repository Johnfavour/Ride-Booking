import { useContext, useState } from 'react';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import { BookingContext, BookingProvider } from './context/BookingContext';

const App = () => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [editing, setEditing] = useState(false);

  const handleSubmit = (details) => {
    setBookingDetails(details);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-gray-800" >
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white flex items-center justify-center">RideIn</h1>
      {!bookingDetails || editing ? (
        <BookingForm handleSubmit={handleSubmit} />
      ) : (
        <BookingSummary bookingDetails={bookingDetails} handleEdit={handleEdit} handleCancel={handleCancel} />
      )}
    </div>
    </div>
  );
};

const RootApp = () => (
  <BookingProvider>
    <App />
  </BookingProvider>
);

export default RootApp;


