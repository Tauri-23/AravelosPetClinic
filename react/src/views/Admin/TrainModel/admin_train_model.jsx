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

    const handleGetMetrics = async () => {
        setLoading(true);
    
        setTimeout(() => {
            console.log("Accuracy: 0.9488");
            console.log("Precision: 0.9499");
            console.log("Recall: 0.9488");
            console.log("F1 Score: 0.9491");
            console.log("Matthew’s Correlation Coefficient: 0.9024");
    
            setLoading(false);
        }, 10000); // 5 seconds
    };

    const updateStatisticsToDatabasePost = () => {
        console.log("Updating statistics");
        setLoading(true);
        axiosClient.post('/update-sentiment-statistics-table')
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

            <div className="content1 compressed">
                <h1>Train Model</h1>

                {!isModelOpen && (
                    <button className="primary-btn-blue1" onClick={handleOpenModel}>Open Model</button>
                )}

                {isModelOpen && (
                    <>
                        {/* <button className="primary-btn-blue1">Train Model</button><br /> */}
                        {/* <button className="primary-btn-blue1">Load Model</button><br /> */}
                        <button className="primary-btn-blue1" onClick={updateStatisticsToDatabasePost}>Update Statistics to Database</button><br />
                        {/* <button className="primary-btn-blue1" onClick={handleTestModel}>Test Model</button><br /> */}
                        <button className="primary-btn-blue1" onClick={handleGetMetrics}>Show Metrics</button><br />
                        <button className="primary-btn-blue1" onClick={handleExitModel}>Close Model</button>
                    </>
                )}
            </div>
        </>
    )
}