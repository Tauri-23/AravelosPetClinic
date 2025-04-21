import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Meh } from 'lucide-react';
import FeedbackModal from '../../components/Modals/feedbackModal1';
import "../../assets/css/FeedbackChart.css";
import { fetchAllSentiments } from '../../services/SentimentAnalysisService';
import { useOutletContext } from 'react-router-dom';
import {DatePicker} from "antd";

export default function adminFeedbackAnalysis() {
    const {RangePicker} = DatePicker;
    const {setActiveNavLink} = useOutletContext();
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [feedbacks, setFeedbacks] = useState(null);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(null);



    /**
     * Onmount
     */
    useState(() => {
        setActiveNavLink("Feedback Analysis");

        const getAll = async() => {
            try {
                const data = await fetchAllSentiments();
                console.log(data);
                setFeedbacks(data);
                setFilteredFeedbacks(data);
            } catch (error) {
                console.error(error);
            }
        }

        getAll();
    }, []);

    const chartData = filteredFeedbacks?.map((item) => {
        const positiveCount = item.positive_comments.length;
        const neutralCount = item.neutral_comments.length;
        const negativeCount = item.negative_comments.length;
        const total = positiveCount + neutralCount + negativeCount || 1; // Prevent division by zero
    
        return {
            ...item,
            positive_percent: Math.round((positiveCount / total) * 100),
            neutral_percent: Math.round((neutralCount / total) * 100),
            negative_percent: Math.round((negativeCount / total) * 100),
        };
    });


    /**
     * Hanlders
     */
    const handleDateRangeChange = (e) => {
        if (!e) {
            setFilteredFeedbacks(feedbacks); // show all feedbacks if no date selected
            return;
        }
    
        const startDate = e[0].startOf("month").toDate();
        const endDate = e[1].endOf("month").toDate();
    
        const filteredResult = filteredFeedbacks.map(feedback => {
            const filterByDate = (comments) => comments.filter(comment => {
                const commentDate = new Date(comment.created_at);
                return commentDate >= startDate && commentDate <= endDate;
            });
    
            return {
                ...feedback,
                positive_comments: filterByDate(feedback.positive_comments),
                negative_comments: filterByDate(feedback.negative_comments),
                neutral_comments: filterByDate(feedback.neutral_comments),
                positive_count: filterByDate(feedback.positive_comments).length,
                negative_count: filterByDate(feedback.negative_comments).length,
                neutral_count: filterByDate(feedback.neutral_comments).length,
            };
        });
    
        setFilteredFeedbacks(filteredResult);
    };
    

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
        <div className="content1 compressed">
            {feedbacks && filteredFeedbacks
            ? (
                <>
                    <div className="dashboard-header">
                        <h2>Veterinary Clinic Feedback Analysis</h2>

                        <RangePicker
                        picker="month"
                        onChange={handleDateRangeChange}/>
                    </div>

                    <div className="stats-container">
                        {filteredFeedbacks.map((item) => {
                            const positiveCount = item.positive_comments.length;
                            const neutralCount = item.neutral_comments.length;
                            const negativeCount = item.negative_comments.length;
                            const total = positiveCount + neutralCount + negativeCount || 1;

                            const posiPercent = Math.round((positiveCount / total) * 100);
                            const neutralPercent = Math.round((neutralCount / total) * 100);
                            const negaPercent = Math.round((negativeCount / total) * 100);

                            return (
                                <div key={item.aspect} className="stat-card">
                                    <h3>{item.aspect}</h3>
                                    <div className="percentage-bar">
                                        <div
                                            className="positive-bar"
                                            style={{ width: `${posiPercent}%` }}
                                        />

                                        <div
                                            className="neutral-bar"
                                            style={{ width: `${neutralPercent}%` }}
                                        />

                                        <div
                                            className="negative-bar"
                                            style={{ width: `${negaPercent}%` }}
                                        />
                                    </div>
                                    <div className="stat-details">
                                        <span className="positive-text">
                                            {posiPercent}% Positive
                                        </span>
                                        <span className="neutral-text">
                                            {neutralPercent}% Neutral
                                        </span>
                                        <span className="negative-text">
                                            {negaPercent}% Negative
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={chartData}
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
    );
};
