
const BookingSummary = ({ bookingDetails, handleEdit, handleCancel }) => (
    <div className="p-4 bg-gray-400 rounded">
      <h2 className="text-lg font-bold">Booking Summary</h2>
      <p>Pickup Location: {bookingDetails.pickup}</p>
      <p>Destination: {bookingDetails.destination}</p>
      <p>Date: {bookingDetails.date}</p>
      <p>Time: {bookingDetails.time}</p>
      <button onClick={handleEdit} className="bg-yellow-300 text-white px-4 py-2 rounded mt-2">Edit</button>
      <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">Cancel</button>
    </div>
  );
  
  export default BookingSummary;
  