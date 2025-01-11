import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Meh } from 'lucide-react';
import FeedbackModal from '../../components/Modals/feedbackModal1';
import "../../assets/css/FeedbackChart.css";
import { fetchAllSentiments } from '../../services/SentimentAnalysisService';

export default function adminFeedbackAnalysis() {
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbacks, setFeedbacks] = useState(null);



    /**
     * Fetch all necessary data
     */
    useState(() => {
        const getAll = async() => {
            try {
                const data = await fetchAllSentiments();
                console.log(data);
                setFeedbacks(data);
            } catch (error) {
                console.error(error);
            }
        }

        getAll();
    }, []);

    const handleBarClick = (data, feedbackType) => {
        const aspectData = feedbacks.find(item => item.aspect === data.aspect);
        setModalData({
            aspect: data.aspect,
            feedbackType,
            comments: aspectData[feedbackType],
            positive_comments: aspectData.positive_comments,
            neutral_comments: aspectData.neutral_comments,
            negative_comments: aspectData.negative_comments,
        });
        setIsModalOpen(true);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload[0].payload.total;
            const positive = payload[0].payload.positive_percent;
            const neutral = payload[0].payload.neutral_percent;
            const negative = payload[0].payload.negative_percent;
            const positive_count = payload[0].payload.positive_count;
            const neutral_count = payload[0].payload.neutral_count;
            const negative_count = payload[0].payload.negative_count;

            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    <p className="tooltip-positive">
                        <CheckCircle className="icon" size={16} />
                        Positive: {positive_count} ({positive.toFixed(1)}%)
                    </p>
                    <p className="tooltip-neutral">
                        <Meh className="icon" size={16} />
                        Neutral: {neutral_count} ({neutral.toFixed(1)}%)
                    </p>
                    <p className="tooltip-negative">
                        <AlertCircle className="icon" size={16} />
                        Negative: {negative_count} ({negative.toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };



    /**
     * Render
     */
    return (
        <div className="offwhite">
            <div className="feedback-dashboard">
                {feedbacks
                ? (
                    <>
                        <div className="dashboard-header">
                            <h2>Veterinary Clinic Feedback Analysis</h2>
                            <p className="dashboard-subtitle">Click on bars to view detailed comments</p>
                        </div>

                        <div className="stats-container">
                            {feedbacks.map((item) => (
                                <div key={item.aspect} className="stat-card">
                                    <h3>{item.aspect}</h3>
                                    <div className="percentage-bar">
                                        <div
                                            className="positive-bar"
                                            style={{ width: `${item.positive_percent}%` }}
                                        />

                                        <div
                                            className="neutral-bar"
                                            style={{ width: `${item.neutral_percent}%` }}
                                        />

                                        <div
                                            className="neutral-bar"
                                            style={{ width: `${item.negative_percent}%` }}
                                        />
                                    </div>
                                    <div className="stat-details">
                                        <span className="positive-text">
                                            {item.positive_percent.toFixed(1)}% Positive
                                        </span>
                                        <span className="neutral-text">
                                            {item.neutral_percent.toFixed(1)}% Neutral
                                        </span>
                                        <span className="negative-text">
                                            {item.negative_percent.toFixed(1)}% Negative
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={feedbacks}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    barGap={0}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="aspect" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="positive_percent"
                                        stackId="a"
                                        fill="#10B981"
                                        onClick={(data) => handleBarClick(data, 'positive_comments')}
                                        cursor="pointer"
                                    />
                                    <Bar
                                        dataKey="neutral_percent"
                                        stackId="b"
                                        fill="#949494"
                                        onClick={(data) => handleBarClick(data, 'neutral_comments')}
                                        cursor="pointer"
                                    />
                                    <Bar
                                        dataKey="negative_percent"
                                        stackId="c"
                                        fill="#EF4444"
                                        onClick={(data) => handleBarClick(data, 'negative_comments')}
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
                    </>
                )
                : (
                    <>Loading...</>
                )}
            </div>
        </div>
    );
};
