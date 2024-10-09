import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  BookingProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
