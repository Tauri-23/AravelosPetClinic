import { useEffect, useState } from "react"
import axiosClient from "../../../axios-client";
import { useModal } from "../../../contexts/ModalContext";
import { notify } from "../../../assets/js/utils";

export default function AdminTrainModel() {
    const [isModelOpen, setModelOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);



    /**
     * Handlers
     */
    const handleOpenModel = () => {
        setModelOpen(true);
    }

    const handleExitModel = () => {
        setModelOpen(false);
    }

    const handleUpdateStatistics = () => {
        setLoading(true);
        axiosClient.get('/get-statistics-from-model')
        .then(({data}) => {
            updateStatisticsToDatabasePost(data.data);
        }).catch(error => {console.error(error); setLoading(false)});
    }

    const formatAspect = (str) => {
        return str
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize first letter of each word
    };

    const updateStatisticsToDatabasePost = (data) => {
        console.log(data);
        const aspects = ["hygiene", "waiting_time", "customer_service", "vet_care", "pricing"];

        const formData = new FormData();
        aspects.forEach(aspect => {
            const dataOfAspect = data[aspect];
            formData.append('aspects[]', formatAspect(aspect));
            formData.append('positive_percent[]', dataOfAspect.positive.percentage);
            formData.append('neutral_percent[]', dataOfAspect.neutral.percentage);
            formData.append('negative_percent[]', dataOfAspect.negative.percentage);
            formData.append('positive_count[]', dataOfAspect.positive.count);
            formData.append('neutral_count[]', dataOfAspect.neutral.count);
            formData.append('negative_count[]', dataOfAspect.negative.count);
            formData.append('positive_comments[]', JSON.stringify(dataOfAspect.positive.top_comments));
            formData.append('neutral_comments[]', JSON.stringify(dataOfAspect.neutral.top_comments));
            formData.append('negative_comments[]', JSON.stringify(dataOfAspect.negative.top_comments));
        });

        axiosClient.post('/update-sentiment-statistics-table', formData)
        .then(({data}) => {
            console.log(data);
            setLoading(false);
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
            notify("error", "Something went wrong", "top-center", 3000);
        })
    }



    /**
     * Render Content
     */
    return(
        <>
            {isLoading && (
                <div className="modal1">
                    <div className="modal-box3">
                        <h3 className="m-auto">Loading please wait...</h3>
                    </div>
                </div>
            )}

            <div className="content1">
                <h1>Train Model</h1>

                {!isModelOpen && (
                    <button className="primary-btn-blue1" onClick={handleOpenModel}>Open Model</button>
                )}

                {isModelOpen && (
                    <>
                        <button className="primary-btn-blue1">Train Model</button><br />
                        <button className="primary-btn-blue1">Load Model</button><br />
                        <button className="primary-btn-blue1" onClick={handleUpdateStatistics}>Update Statistics to Database</button><br />
                        <button className="primary-btn-blue1" onClick={handleExitModel}>Close Model</button>
                    </>
                )}
            </div>
        </>
    )
}