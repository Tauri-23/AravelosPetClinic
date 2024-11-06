import React, { useState, useEffect } from 'react';
import "../../assets/css/adminFeedback.css";

const adminFeedback = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [reviews, setReviews] = useState([]);
  const [serviceRankings, setServiceRankings] = useState([]);
  const [aspectSentiments, setAspectSentiments] = useState([
    { aspect: 'Hygiene', sentiment: 'positive', count: 15 },
    { aspect: 'Vet Care', sentiment: 'positive', count: 20 },
    { aspect: 'Customer Service', sentiment: 'neutral', count: 12 },
    { aspect: 'Booking Experience', sentiment: 'negative', count: 8 },
    { aspect: 'Waiting Time', sentiment: 'negative', count: 10 }
  ]);

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
          petName: "Bentong",
          rating: 4,
          review: "Vet was knowledgeable, but the waiting time was long.",
          time: "11:00 AM",
          service: "Surgery"
        },
        {
          name: "Pet Owner 5",
          petName: "Max",
          rating: 2,
          review: "Gupit pogi.",
          time: "9:00 AM",
          service: "Haircut"
        },
        {
          name: "Pet Owner 6",
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

      // Calculate service rankings only
      const services = {};
      fetchedReviews.forEach(review => {
        services[review.service] = (services[review.service] || 0) + 1;
      });

      // Convert to array and sort
      const rankingsData = Object.entries(services)
        .map(([name, count]) => ({
          name,
          count,
          percentage: (count / fetchedReviews.length) * 100
        }))
        .sort((a, b) => b.count - a.count);

      setServiceRankings(rankingsData);
    };

    fetchReviews();
  }, [selectedTime, selectedService]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => {
        if (prevPage < Math.ceil(reviews.length / itemsPerPage)) {
          return prevPage + 1;
        } else {
          return 1;
        }
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [reviews]);

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

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#22c55e';
      case 'negative':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '↑';
      case 'negative':
        return '↓';
      default:
        return '-';
    }
  };


  return (
    <div className="wrapper">
      <div className="main-container">
        {/* Customer Feedback Section */}
        <div className="section-card">
          <h2 className="section-title">Customer Feedback</h2>
          <div className="filter-container">
            <select 
              className="select-input"
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
            </select>
            <select 
              className="select-input"
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="Check-up">Check-up</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Surgery">Surgery</option>
            </select>
          </div>
          <div className="reviews-container">
            {currentReviews.map((review, index) => (
              <div key={index} className="review-card">
                <h3 className="reviewer-name">{review.name}</h3>
                <p className="pet-name"><strong>Pet:</strong> {review.petName}</p>
                <p className="review-text">{review.review}</p>
                <p className="rating">Rating: {review.rating}</p>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`pagination-dot ${number === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(number)}
              />
            ))}
          </div>
        </div>

        {/* Rankings Section - Services Only */}
        <div className="section-card">
          <h2 className="section-title">Service Rankings</h2>
          {serviceRankings.map((service, index) => (
            <div key={index} className="ranking-item">
              <div className="ranking-header">
                <span className="aspect-name">{service.name}</span>
                <div className="ranking-stats">
                  <span className="review-count">{service.count} reviews</span>
                  <span className="ranking-position">#{index + 1}</span>
                </div>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{
                    width: `${service.percentage}%`,
                    backgroundColor: index === 0 ? '#22c55e' : 
                                  index === serviceRankings.length - 1 ? '#ef4444' : '#3b82f6'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="section-card sentiment-section">
          <h2 className="section-title">Aspect Sentiment Analysis</h2>
          <div className="sentiment-container">
            {aspectSentiments.map((aspect, index) => (
              <div key={index} className="sentiment-item">
                <div className="sentiment-header">
                  <span className="aspect-name">{aspect.aspect}</span>
                  <div className="sentiment-indicator">
                    <span 
                      className="sentiment-badge"
                      style={{ 
                        backgroundColor: getSentimentColor(aspect.sentiment),
                        color: 'white'
                      }}
                    >
                      {getSentimentIcon(aspect.sentiment)} {aspect.sentiment}
                    </span>
                    <span className="sentiment-count">{aspect.count} mentions</span>
                  </div>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{
                      width: `${(aspect.count / Math.max(...aspectSentiments.map(a => a.count))) * 100}%`,
                      backgroundColor: getSentimentColor(aspect.sentiment)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminFeedback;