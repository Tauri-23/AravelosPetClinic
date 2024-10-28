import React, { useState, useEffect } from 'react';

const adminFeedback = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = [
        {
          name: "Pet Owner 1",
          petName: "Buddy",
          rating: 5,
          review: "Excellent care for my furry friend!",
          time: "9:00 AM",
          service: "Check-up"
        },
        {
          name: "Pet Owner 2",
          petName: "Coco",
          rating: 4,
          review: "Good service, but could be faster.",
          time: "10:00 AM",
          service: "Vaccination"
        },
        {
          name: "Pet Owner 3",
          petName: "Max",
          rating: 3,
          review: "Vet was knowledgeable, but the waiting time was long.",
          time: "11:00 AM",
          service: "Surgery"
        },
        {
          name: "Pet Owner 4",
          petName: "bentong",
          rating: 4,
          review: "Vet was knowledgeable, but the waiting time was long.",
          time: "11:00 AM",
          service: "Surgery"
        },
        {
          name: "Pet Owner 5",
          petName: "Max",
          rating: 2,
          review: "Vet was knowledgeable, but the waiting time was long.",
          time: "9:00 AM",
          service: "Surgery"
        }
      ];

      // Filter reviews based on selected options
      const filteredReviews = fetchedReviews.filter((review) => {
        let keepReview = true;
        if (selectedTime) {
          keepReview = keepReview && review.time === selectedTime;
        }
        if (selectedService) {
          keepReview = keepReview && review.service === selectedService;
        }
        return keepReview;
      });

      setReviews(filteredReviews);
    };

    fetchReviews();
  }, [selectedTime, selectedService]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => {
        if (prevPage < Math.ceil(reviews.length / itemsPerPage)) {
          return prevPage + 1;
        } else {
          return 1; // Reset to the first page
        }
      });
    }, 5000); // Adjust the interval time as needed (in milliseconds)

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [reviews]);

  // Calculate the index of the first and last item for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2>Customer Feedback</h2>
      <div className="booking-options">
        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Select Time</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          {/* Add more time options */}
        </select>
        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
          <option value="">Select Service</option>
          <option value="Check-up">Check-up</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Surgery">Surgery</option>
          {/* Add more service options */}
        </select>
      </div>
      <div className="reviews">
        {currentReviews.map((review, index) => (
          <div key={index} className="review">
            <h3>{review.name}</h3>
            <p><strong>Pet:</strong> {review.petName}</p>
            <p>{review.review}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <div key={number}>
              <input
                type="radio"
                id={`page-${number}`}
                name="page"
                value={number}
                checked={number === currentPage}
                onChange={() => handlePageChange(number)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default adminFeedback;