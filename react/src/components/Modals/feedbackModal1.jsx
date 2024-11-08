import React from 'react';
import { X, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import "../../assets/css/FeedbackModal.css";

const feedbackModal1 = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="feedback modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-content">
                        <h3>{data.aspect}</h3>
                        <div className="feedback-type">
                            {data.feedbackType === 'positive' ? (
                                <>
                                    <ThumbsUp className="feedback-icon positive" />
                                    <span className="positive">Positive Feedback</span>
                                </>
                            ) : (
                                <>
                                    <ThumbsDown className="feedback-icon negative" />
                                    <span className="negative">Negative Feedback</span>
                                </>
                            )}
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {data.comments.length > 0 ? (
                        <div className="comments-list">
                            {data.comments.map((comment, index) => (
                                <div key={index} className="comment-card">
                                    <MessageSquare size={18} className="comment-icon" />
                                    <p>{comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-comments">
                            <MessageSquare size={24} />
                            <p>No comments available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default feedbackModal1;
