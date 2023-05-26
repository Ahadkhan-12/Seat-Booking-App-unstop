import React, { useState } from "react";
import "./App.css";

const SeatBookingApp = () => {
  const [seats, setSeats] = useState(Array(80).fill(false));
  const [numSeats, setNumSeats] = useState(1);

  const handleSeatClick = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = !updatedSeats[index];
    setSeats(updatedSeats);
  };

  const renderSeats = () => {
    const rows = Math.floor(80 / 7);
    const lastRowSeats = 80 % 7;

    let seatNumber = 1;
    const seatsLayout = [];

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let i = 1; i <= 7; i++) {
        const seatIndex = (row - 1) * 7 + (i - 1);
        rowSeats.push(
          <div
            key={seatIndex}
            className={`seat ${seats[seatIndex] ? "booked" : "available"}`}
            onClick={() => handleSeatClick(seatIndex)}
          >
            {seatNumber}
          </div>
        );
        seatNumber++;
      }
      seatsLayout.push(
        <div key={row} className="row">
          {rowSeats}
        </div>
      );
    }

    // Renderinf last row
    if (lastRowSeats > 0) {
      const lastRow = [];
      for (let i = 1; i <= lastRowSeats; i++) {
        const seatIndex = rows * 7 + (i - 1);
        lastRow.push(
          <div
            key={seatIndex}
            className={`seat ${seats[seatIndex] ? "booked" : "available"}`}
            onClick={() => handleSeatClick(seatIndex)}
          >
            {seatNumber}
          </div>
        );
        seatNumber++;
      }
      seatsLayout.push(
        <div key={rows + 1} className="row">
          {lastRow}
        </div>
      );
    }

    return seatsLayout;
  };

  const bookSeats = (numSeats) => {
    const availableSeats = seats.findIndex((seat, index) => {
      if (numSeats === 1) {
        return !seat;
      } else {
        for (let i = index; i < index + numSeats; i++) {
          if (seats[i] || i >= seats.length) {
            return false;
          }
        }
        return true;
      }
    });

    if (availableSeats !== -1) {
      const updatedSeats = [...seats];
      for (let i = availableSeats; i < availableSeats + numSeats; i++) {
        updatedSeats[i] = true;
      }
      setSeats(updatedSeats);
      alert(`Seats booked: ${availableSeats + 1}-${availableSeats + numSeats}`);
    } else {
      alert("No seats available!");
    }
  };
  
  const handleBooking = () => {
    if (numSeats < 1 || numSeats > 7) {
      alert("Please enter a number between 1 and 7.");
      return;
    }
    bookSeats(numSeats);
  };

  return (
    <div className="App">
      <h1>Seat Booking App</h1>
      <h2>Click on each seat which was prebooked by other users</h2>
      <div className="seats-container">{renderSeats()}</div>
      <div className="booking-controls">
        <input
          type="number"
          min="1"
          max="7"
          value={numSeats}
          onChange={(e) => setNumSeats(parseInt(e.target.value))}
        />
        <button onClick={handleBooking}>Book Seats</button>
      </div>
    </div>
  );
};

export default SeatBookingApp;
