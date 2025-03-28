import { Button, DatePicker, Input, InputNumber } from "antd";
import { useState } from "react"
import { formatTime } from "../../../../assets/js/utils";

export default function MedicalHistoryForm() {
    const timeOptions = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00"];

    const [selectedNextAptDate, setSelectedNextAptDate] = useState(null);
    const [selectedNextAptTime, setSelectedNextAptTime] = useState("");

    const [step, setStep] = useState(1);



    /**
     * Render
     */
    return(
        <div className="appointment-cont1">
            <h3 className="mar-bottom-1">Input Medical History</h3>

            <div className="d-flex gap1 mar-bottom-2">
                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="weight">Weight in Kg</label>
                    <InputNumber
                    id="weight"
                    className="w-100"
                    min={0}
                    size="large"
                    placeholder={"Weight in KG"}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="weight">Pulse</label>
                    <InputNumber
                    id="pulse"
                    className="w-100"
                    size="large"
                    placeholder={"Pulse per minute"}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="resporatoryRate">Respiratory Rate</label>
                    <InputNumber
                    id="resporatoryRate"
                    className="w-100"
                    size="large"
                    placeholder={"Rate per minute"}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="temp">Temperature in Celcius</label>
                    <InputNumber
                    id="temp"
                    className="w-100"
                    size="large"
                    placeholder={"Temp in celcius"}
                    />
                </div>
            </div>

            <div className="d-flex gap1 mar-bottom-2">
                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="diet">Diet (optional)</label>
                    <Input
                    id="diet"
                    className="w-100"
                    size="large"
                    placeholder={"Item1, Item2, Item3, ..."}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="allergies">Allergies (optional)</label>
                    <Input
                    id="allergies"
                    className="w-100"
                    size="large"
                    placeholder={"Item1, Item2, Item3, ..."}
                    />
                </div>
            </div>

            <div className="d-flex gap1 mar-bottom-2">
                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="prevSurgery">Previous surgery (optional)</label>
                    <Input
                    id="prevSurgery"
                    className="w-100"
                    size="large"
                    placeholder={"previous surgery"}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="complaintsRequests">Complaints / Requests (optional)</label>
                    <Input
                    id="complaintsRequests"
                    className="w-100"
                    size="large"
                    placeholder={"Reason for visit"}
                    />
                </div>
            </div>

            <div className="d-flex gap1 mar-bottom-2">
                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="medicationByOwner">Medications given by owner (optional)</label>
                    <Input
                    id="medicationByOwner"
                    className="w-100"
                    size="large"
                    placeholder={"Item1, Item2, Item3, ..."}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="complaintsRequests">Medications given by other vets (optional)</label>
                    <Input
                    id="complaintsRequests"
                    className="w-100"
                    size="large"
                    placeholder={"Item1, Item2, Item3, ..."}
                    />
                </div>
            </div>

            <div className="d-flex gap1 mar-bottom-2">
                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="procedure">Procedure done</label>
                    <Input
                    id="procedure"
                    className="w-100"
                    size="large"
                    placeholder={"Item1, Item2, Item3, ..."}
                    />
                </div>

                <div className="d-flex flex-direction-y gap4 w-100">
                    <label htmlFor="nextAppointmentDate">Next appointment date (optional)</label>
                    <DatePicker
                    id="nextAppointmentDate"
                    className="w-100"
                    size="large"
                    />
                </div>
            </div>

            <div className="mar-bottom-1">
                <p>Next appointment time</p>
                <div className="d-flex flex-wrap gap3">
                    {timeOptions.map(time => (
                        <Button
                        key={time}
                        type={selectedNextAptTime === time ? "primary" : "default"}
                        onClick={() => setSelectedNextAptTime(time)}>
                            {formatTime(time)}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="d-flex gap3 justify-content-end">
                <Button type="primary" size="large">Next</Button>
            </div>
        </div>
    )
}