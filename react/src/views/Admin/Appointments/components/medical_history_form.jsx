import { Button, DatePicker, Input, InputNumber, Radio, Steps } from "antd";
import { useState } from "react"
import { formatTime } from "../../../../assets/js/utils";

export default function MedicalHistoryForm() {
    const timeOptions = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00"];

    /**
     * Basic Information
     */
    const [weight, setWeight] = useState(0);
    const [pulse, setPulse] = useState(0);
    const [respiratoryRate, setRespiratoryRate] = useState(0);
    const [temp, setTemp] = useState(0);
    const [diet, setDiet] = useState("");
    const [allergies, setAllergies] = useState("");
    const [prevSurg, setPrevSurg] = useState("");
    const [request, setRequest] = useState("");
    const [medByOwner, setMedByOwner] = useState("");
    const [medByOtherVet, setMedByOtherVet] = useState("");
    const [procedure, setProcedure] = useState("");
    const [selectedNextAptDate, setSelectedNextAptDate] = useState(null);
    const [selectedNextAptTime, setSelectedNextAptTime] = useState("");

    /**
     * Physical Exam
     */
    const [genCon, setgenCon] = useState("");
    const [genAttitude, setGenAttitude] = useState("");
    const [hydration, setHydration] = useState("");
    const [mucousMembrane, setMucousMembrane] = useState("");
    const [headNeck, setHeadNeck] = useState("");
    const [eyes, setEyes] = useState("");
    const [ears, setEars] = useState("");
    const [gastrointestinal, setGastrointestinal] = useState("");
    const [urogenitals, setUrogenitals] = useState("");
    const [respiratory, setRespiratory] = useState("");
    const [circulatory, setCirculatory] = useState("");
    const [musculoskeleton, setMusculoskeleton] = useState("");
    const [lymphNodes, setLymphNodes] = useState("");
    const [venousReturn, setVenousReturn] = useState("");
    const [integumentarySkin, setIntegumentarySkin] = useState("");

    /**
     * Laboratory Exam
     */
    const [bloodExam, setBloodExam] = useState(false);
    const [bloodExamResult, setBloodExamResult] = useState(false);

    const [distemperTest, setDistemperTest] = useState(false);
    const [distemperTestResult, setDistemperTestResult] = useState(false);

    const [earSwabbing, setEarSwabbing] = useState(false);
    const [earSwabbingResult, setEarSwabbingResult] = useState(false);

    const [ehrlichiaTest, setEhrlichiaTest] = useState(false);
    const [ehrlichiaTestResult, setEhrlichiaTestResult] = useState(false);

    const [heartwormTest, setHeartwormTest] = useState(false);
    const [heartwormTestResult, setHeartwormTestResult] = useState(false);

    const [parvoTest, setParvoTest] = useState(false);
    const [parvoTestResult, setParvoTestResult] = useState(false);

    const [skinScraping, setSkinScraping] = useState(false);
    const [skinScrapingResult, setSkinScrapingResult] = useState(false);

    const [stoolExam, setStoolExam] = useState(false);
    const [stoolExamResult, setStoolExamResult] = useState(false);

    const [ultrasound, setUltrasound] = useState(false);
    const [ultrasoundResult, setUltrasoundResult] = useState(false);

    const [urineExam, setUrineExam] = useState(false);
    const [urineExamResult, setUrineExamResult] = useState(false);

    const [vaginalSmear, setVaginalSmear] = useState(false);
    const [vaginalSmearResult, setVaginalSmearResult] = useState(false);

    const [xray, setXray] = useState(false);
    const [xrayResult, setXrayResult] = useState(false);

    const [otherTest, setOtherTest] = useState(false);
    const [otherTestResult, setOtherTestResult] = useState(false);


    const [step, setStep] = useState(0);

    /**
     * Render Arrays
     */
    const PhysicalExamFields = [
        {
            title: "General Condition",
            value: genCon,
            changeEvent: (e) => setgenCon(e.target.value),
        },
        {
            title: "General Attitude",
            value: genAttitude,
            changeEvent: (e) => setGenAttitude(e.target.value),
        },
        {
            title: "Hydration",
            value: hydration,
            changeEvent: (e) => setHydration(e.target.value),
        },
        {
            title: "Mucous Membrane",
            value: mucousMembrane,
            changeEvent: (e) => setMucousMembrane(e.target.value),
        },
        {
            title: "Head / Neck",
            value: headNeck,
            changeEvent: (e) => setHeadNeck(e.target.value),
        },
        {
            title: "Eyes",
            value: eyes,
            changeEvent: (e) => setEyes(e.target.value),
        },
        {
            title: "Ears",
            value: ears,
            changeEvent: (e) => setEars(e.target.value),
        },
        {
            title: "Gastrointestinal",
            value: gastrointestinal,
            changeEvent: (e) => setGastrointestinal(e.target.value),
        },
        {
            title: "Urogenitals",
            value: urogenitals,
            changeEvent: (e) => setUrogenitals(e.target.value),
        },
        {
            title: "Respiratory",
            value: respiratory,
            changeEvent: (e) => setRespiratory(e.target.value),
        },
        {
            title: "Circulatory",
            value: circulatory,
            changeEvent: (e) => setCirculatory(e.target.value),
        },
        {
            title: "Musculoskeleton",
            value: musculoskeleton,
            changeEvent: (e) => setMusculoskeleton(e.target.value),
        },
        {
            title: "Lymph Nodes",
            value: lymphNodes,
            changeEvent: (e) => setLymphNodes(e.target.value),
        },
        {
            title: "Venous Return",
            value: venousReturn,
            changeEvent: (e) => setVenousReturn(e.target.value),
        },
        {
            title: "Integumentary / Skin",
            value: integumentarySkin,
            changeEvent: (e) => setIntegumentarySkin(e.target.value),
        },
    ]

    const LabExamFields = [
        {
            title: "Blood Exam",
            isChecked: bloodExam,
            resultValue: bloodExamResult,
            setChecked: setBloodExam,
            setValue: (e) => setBloodExamResult(e.target.value)
        }
    ]



    /**
     * Checker
     */
    const isNextBtnDisabled = () => {
        return ;
    }



    /**
     * Render
     */
    return(
        <div className="appointment-cont1">
            <h3 className="mar-bottom-1">Input Medical History</h3>

            <Steps
            current={step}
            items={[
                {title: "Basic Information"},
                {title: "Physical Exam"},
                {title: "Laboratory Exam"},
                {title: "Diagnosis"},
            ]}
            labelPlacement="vertical"
            size="small"
            className="mar-bottom-1"
            />

            {/**
             * Basic Information
             */}
            {step === 0 && (
                <>
                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="weight">Weight in Kg</label>
                            <InputNumber
                            id="weight"
                            className="w-100"
                            min={0}
                            size="large"
                            placeholder={"Weight in KG"}
                            value={weight}
                            onChange={(e) => {setWeight(e)}}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="weight">Pulse</label>
                            <InputNumber
                            id="pulse"
                            className="w-100"
                            size="large"
                            placeholder={"Pulse per minute"}
                            value={pulse}
                            onChange={(e) => {setPulse(e)}}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="resporatoryRate">Respiratory Rate</label>
                            <InputNumber
                            id="resporatoryRate"
                            className="w-100"
                            size="large"
                            placeholder={"Rate per minute"}
                            value={respiratoryRate}
                            onChange={(e) => {setRespiratoryRate(e)}}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="temp">Temperature in Celcius</label>
                            <InputNumber
                            id="temp"
                            className="w-100"
                            size="large"
                            placeholder={"Temp in celcius"}
                            value={temp}
                            onChange={(e) => {setTemp(e)}}
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
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="allergies">Allergies (optional)</label>
                            <Input
                            id="allergies"
                            className="w-100"
                            size="large"
                            placeholder={"Item1, Item2, Item3, ..."}
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
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
                            value={prevSurg}
                            onChange={(e) => setPrevSurg(e.target.value)}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="complaintsRequests">Complaints / Requests (optional)</label>
                            <Input
                            id="complaintsRequests"
                            className="w-100"
                            size="large"
                            placeholder={"Reason for visit"}
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
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
                            value={medByOwner}
                            onChange={(e) => setMedByOwner(e.target.value)}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="complaintsRequests">Medications given by other vets (optional)</label>
                            <Input
                            id="complaintsRequests"
                            className="w-100"
                            size="large"
                            placeholder={"Item1, Item2, Item3, ..."}
                            value={medByOtherVet}
                            onChange={(e) => setMedByOtherVet(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="procedure">Procedure done (optional)</label>
                            <Input
                            id="procedure"
                            className="w-100"
                            size="large"
                            placeholder={"Item1, Item2, Item3, ..."}
                            value={procedure}
                            onChange={(e) => setProcedure(e.target.value)}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="nextAppointmentDate">Next appointment date (optional)</label>
                            <DatePicker
                            id="nextAppointmentDate"
                            className="w-100"
                            size="large"
                            value={selectedNextAptDate}
                            onChange={(e) => setSelectedNextAptDate(e)}
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
                </>
            )}

            {/**
             * Physical Exam
             */}
            {step === 1 && (
                <>
                    {PhysicalExamFields.map((exam, index) => (
                        <div key={index} className="mar-bottom-2">
                            <p className="fw-bold">{exam.title}</p>
                            <Radio.Group
                            options={[
                                {label: "N", value: "N"},
                                {label: "AB", value: "AB"},
                                {label: "NE", value: "NE"},
                            ]}
                            value={exam.value}
                            onChange={exam.changeEvent}
                            />
                        </div>
                    ))}
                </>
            )}

            {/**
             * Laboratory
             */}
            {step === 2 && (
                <>
                </>
            )}

            <div className="d-flex gap3 justify-content-end">
                {step > 0 && (<Button type="default" size="large" onClick={() => setStep(prev => prev - 1)}>Back</Button>)}
                <Button type="primary" size="large" onClick={() => setStep(prev => prev + 1)}>Next</Button>
            </div>
        </div>
    )
}