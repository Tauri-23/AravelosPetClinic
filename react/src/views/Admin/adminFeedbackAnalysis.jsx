import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle } from 'lucide-react';
import FeedbackModal from '../../components/Modals/feedbackModal1';
import "../../assets/css/FeedbackChart.css";

const adminFeedbackAnalysis = () => {
    const feedbackData = [
        {
            aspect: 'Waiting Time',
            positive: 45,
            negative: 15,
            total: 60,
            comments: {
                positive: ['Quick service', 'Minimal wait time', 'Efficient process'],
                negative: ['Waited too long', 'Poor time management']
            }
        },
        {
            aspect: 'Hygiene',
            positive: 60,
            negative: 8,
            total: 68,
            comments: {
                positive: ['Very clean facility', 'Staff follows protocols', 'Sanitized equipment'],
                negative: ['Could be cleaner', 'Messy waiting area']
            }
        },
        {
            aspect: 'Customer Service',
            positive: 55,
            negative: 12,
            total: 67,
            comments: {
                positive: ['Friendly staff', 'Very helpful', 'Great communication'],
                negative: ['Rude receptionist', 'Poor communication']
            }
        },
        {
            aspect: 'Vet Care',
            positive: 65,
            negative: 5,
            total: 70,
            comments: {
                positive: ['Excellent treatment', 'Knowledgeable vet', 'Caring approach', 'Amazing', 'was knowledgeable friendly and truly listened to my concerns a few days later  she called to follow up on my pets recovery '],
                negative: ['Rushed examination', 'Expensive treatments']
            }
        },
        {
            aspect: 'Booking Experience',
            positive: 40,
            negative: 20,
            total: 60,
            comments: {
                positive: ['Easy online booking', 'Flexible scheduling', 'Quick confirmation'],
                negative: ['Website issues', 'Long waiting list', 'Complicated process']
            }
        },
        {
            aspect: 'Pricing',
            positive: 35,
            negative: 25,
            total: 60,
            comments: {
                positive: ['Fair prices', 'Good value', 'Clear pricing'],
                negative: ['Too expensive', 'Hidden charges', 'Unclear pricing']
            }
        }
    ];

    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBarClick = (data, feedbackType) => {
        const aspectData = feedbackData.find(item => item.aspect === data.aspect);
        setModalData({
            aspect: data.aspect,
            feedbackType,
            comments: aspectData.comments[feedbackType]
        });
        setIsModalOpen(true);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload[0].payload.total;
            const positive = payload[0].payload.positive;
            const negative = payload[0].payload.negative;
            
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    <p className="tooltip-positive">
                        <CheckCircle className="icon" size={16} />
                        Positive: {positive} ({((positive/total) * 100).toFixed(1)}%)
                    </p>
                    <p className="tooltip-negative">
                        <AlertCircle className="icon" size={16} />
                        Negative: {negative} ({((negative/total) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="feedback-dashboard">
            <div className="dashboard-header">
                <h2>Veterinary Clinic Feedback Analysis</h2>
                <p className="dashboard-subtitle">Click on bars to view detailed comments</p>
            </div>

            <div className="stats-container">
                {feedbackData.map((item) => (
                    <div key={item.aspect} className="stat-card">
                        <h3>{item.aspect}</h3>
                        <div className="percentage-bar">
                            <div 
                                className="positive-bar"
                                style={{ width: `${(item.positive/item.total) * 100}%` }}
                            />
                        </div>
                        <div className="stat-details">
                            <span className="positive-text">
                                {((item.positive/item.total) * 100).toFixed(1)}% Positive
                            </span>
                            <span className="negative-text">
                                {((item.negative/item.total) * 100).toFixed(1)}% Negative
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={feedbackData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="aspect" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                            dataKey="positive" 
                            stackId="a"
                            fill="#10B981" 
                            onClick={(data) => handleBarClick(data, 'positive')}
                            cursor="pointer"
                        />
                        <Bar 
                            dataKey="negative" 
                            stackId="a"
                            fill="#EF4444" 
                            onClick={(data) => handleBarClick(data, 'negative')}
                            cursor="pointer"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {isModalOpen && (
                <FeedbackModal 
                    data={modalData}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default adminFeedbackAnalysis;




