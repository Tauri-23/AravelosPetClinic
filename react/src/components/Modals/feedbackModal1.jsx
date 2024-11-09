import React, { useState } from 'react';
import { X, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import "../../assets/css/FeedbackModal.css";

const feedbackModal1 = ({ data, onClose }) => {
    if (!data) return null;

    // State for sentiment filter
    const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative'

    // Process feedback sentences to include sentiment
    const feedbackSentences = data.comments.map(comment => {
        // Split long comments into sentences
        return comment.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).map(sentence => ({
            text: sentence.trim(),
            sentiment: data.feedbackType
        }));
    }).flat();

    const filteredSentences = filter === 'all' 
        ? feedbackSentences
        : feedbackSentences.filter(sentence => sentence.sentiment === filter);

    return (
        <div className="modal-overlay">
            <div className="feedback modal-content">
                <div className="modal-header">
                    <button className="close-button mobile-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                    <div className="modal-title-container">
                        <div className="modal-title">
                            <MessageSquare className="modal-icon" />
                            <h3>{data.aspect} Feedback Analysis</h3>
                        </div>
                        <p className="modal-subtitle">Customer sentiments and detailed feedback</p>
                    </div>
                    <button className="close-button desktop-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    {filteredSentences.length > 0 ? (
                        <div className="feedback-list">
                            {filteredSentences.map((sentence, index) => (
                                <div 
                                    key={index} 
                                    className={`feedback-item ${sentence.sentiment}`}
                                >
                                    <div className="feedback-icon">
                                        {sentence.sentiment === 'positive' ? (
                                            <ThumbsUp size={16} />
                                        ) : (
                                            <ThumbsDown size={16} />
                                        )}
                                    </div>
                                    <p>{sentence.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-feedback">
                            <p>No feedback available for the selected filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default feedbackModal1;



