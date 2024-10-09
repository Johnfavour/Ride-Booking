import PropTypes from "prop-types";

const BookingSummary = ({ bookings, onEdit, onDelete, onNewBooking }) => {
  return (
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
                className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300 mt-5"
                onClick={() => onEdit(booking)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-3 hover:bg-red-700 transition-colors duration-300"
                onClick={() => onDelete(booking.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-gray-800"
        onClick={onNewBooking}
      >
        New Booking
      </button>
    </div>
  );
};

// Adding propTypes validation
BookingSummary.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pickup: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNewBooking: PropTypes.func.isRequired,
};

export default BookingSummary;
