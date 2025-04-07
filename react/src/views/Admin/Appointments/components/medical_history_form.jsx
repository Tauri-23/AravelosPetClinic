import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Steps } from "antd";
import { useEffect, useState } from "react"
import { formatTime, isEmptyOrSpaces, notify } from "../../../../assets/js/utils";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

export default function MedicalHistoryForm({appointmentId}) {
    const navigate = useNavigate();
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
    const [note, setNote] = useState("");

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
    const [bloodExamResult, setBloodExamResult] = useState("");

    const [distemperTest, setDistemperTest] = useState(false);
    const [distemperTestResult, setDistemperTestResult] = useState("");

    const [earSwabbing, setEarSwabbing] = useState(false);
    const [earSwabbingResult, setEarSwabbingResult] = useState("");

    const [ehrlichiaTest, setEhrlichiaTest] = useState(false);
    const [ehrlichiaTestResult, setEhrlichiaTestResult] = useState("");

    const [heartwormTest, setHeartwormTest] = useState(false);
    const [heartwormTestResult, setHeartwormTestResult] = useState("");

    const [parvoTest, setParvoTest] = useState(false);
    const [parvoTestResult, setParvoTestResult] = useState("");

    const [skinScraping, setSkinScraping] = useState(false);
    const [skinScrapingResult, setSkinScrapingResult] = useState("");

    const [stoolExam, setStoolExam] = useState(false);
    const [stoolExamResult, setStoolExamResult] = useState("");

    const [ultrasound, setUltrasound] = useState(false);
    const [ultrasoundResult, setUltrasoundResult] = useState("");

    const [urineExam, setUrineExam] = useState(false);
    const [urineExamResult, setUrineExamResult] = useState("");

    const [vaginalSmear, setVaginalSmear] = useState(false);
    const [vaginalSmearResult, setVaginalSmearResult] = useState("");

    const [eyeStrain, setEyeStrain] = useState(false);
    const [eyeStrainResult, setEyeStrainResult] = useState("");

    const [xray, setXray] = useState(false);
    const [xrayResult, setXrayResult] = useState("");

    const [otherTest, setOtherTest] = useState("");
    const [otherTestResult, setOtherTestResult] = useState("");

    /**
     * Diagnosis
     */
    const [tentativeDiagnosis, setTentativeDiagnosis] = useState("");
    const [finalDiagnosis, setFinalDiagnosis] = useState("");
    const [prognosis, setPrognosis] = useState("");
    const [vaccineGiven, setVaccineGiven] = useState("");
    const [prescribedMed, setPrescribedMed] = useState("");


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
        },
        {
            title: "Distemper test",
            isChecked: distemperTest,
            resultValue: distemperTestResult,
            setChecked: setDistemperTest,
            setValue: (e) => setDistemperTestResult(e.target.value)
        },
        {
            title: "Ear Swabbing",
            isChecked: earSwabbing,
            resultValue: earSwabbingResult,
            setChecked: setEarSwabbing,
            setValue: (e) => setEarSwabbingResult(e.target.value)
        },
        {
            title: "Ehrlichia Test",
            isChecked: ehrlichiaTest,
            resultValue: ehrlichiaTestResult,
            setChecked: setEhrlichiaTest,
            setValue: (e) => setEhrlichiaTestResult(e.target.value)
        },
        {
            title: "Heartworm Test",
            isChecked: heartwormTest,
            resultValue: heartwormTestResult,
            setChecked: setHeartwormTest,
            setValue: (e) => setHeartwormTestResult(e.target.value)
        },
        {
            title: "Parvo Test",
            isChecked: parvoTest,
            resultValue: parvoTestResult,
            setChecked: setParvoTest,
            setValue: (e) => setParvoTestResult(e.target.value)
        },
        {
            title: "Skin Scraping",
            isChecked: skinScraping,
            resultValue: skinScrapingResult,
            setChecked: setSkinScraping,
            setValue: (e) => setSkinScrapingResult(e.target.value)
        },
        {
            title: "Stool Exam",
            isChecked: stoolExam,
            resultValue: stoolExamResult,
            setChecked: setStoolExam,
            setValue: (e) => setStoolExamResult(e.target.value)
        },
        {
            title: "Ultrasound",
            isChecked: ultrasound,
            resultValue: ultrasoundResult,
            setChecked: setUltrasound,
            setValue: (e) => setUltrasoundResult(e.target.value)
        },
        {
            title: "Urine Exam",
            isChecked: urineExam,
            resultValue: urineExamResult,
            setChecked: setUrineExam,
            setValue: (e) => setUrineExamResult(e.target.value)
        },
        {
            title: "Vaginal Smear",
            isChecked: vaginalSmear,
            resultValue: vaginalSmearResult,
            setChecked: setVaginalSmear,
            setValue: (e) => setVaginalSmearResult(e.target.value)
        },
        {
            title: "X-ray",
            isChecked: xray,
            resultValue: xrayResult,
            setChecked: setXray,
            setValue: (e) => setXrayResult(e.target.value)
        },
        {
            title: "Eye Strain",
            isChecked: eyeStrain,
            resultValue: eyeStrainResult,
            setChecked: setEyeStrain,
            setValue: (e) => setEyeStrainResult(e.target.value)
        },
        {
            title: "Other test",
            testValue: otherTest,
            resultValue: otherTestResult,
            setTestValue: (e) => setOtherTest(e.target.value),
            setValue: (e) => setOtherTestResult(e.target.value)
        },
    ]



    /**
     * Checker
     */
    const isNextBtnDisabled = () => {
        switch(step) {
            case 1:
                return genCon === "" || genAttitude === "" || hydration === "" ||
                mucousMembrane === "" || headNeck === "" || eyes === "" ||
                ears === "" || gastrointestinal === "" || urogenitals === "" ||
                respiratory === "" || circulatory === "" || musculoskeleton === "" ||
                lymphNodes === "" || venousReturn === "" || integumentarySkin === "";
            case 3:
                return isEmptyOrSpaces(tentativeDiagnosis) || isEmptyOrSpaces(finalDiagnosis) || 
                isEmptyOrSpaces(prognosis) || isEmptyOrSpaces(vaccineGiven) ||
                isEmptyOrSpaces(prescribedMed);
            default: 
                return false;
        }
    }



    /**
     * Handlers
     */
    const handleMarkAllPhyExamAs = (value) => {
        setgenCon(value);
        setGenAttitude(value);
        setHydration(value);
        setMucousMembrane(value);
        setHeadNeck(value);
        setEyes(value);
        setEars(value);
        setGastrointestinal(value);
        setUrogenitals(value);
        setRespiratory(value);
        setCirculatory(value);
        setMusculoskeleton(value);
        setLymphNodes(value);
        setVenousReturn(value);
        setIntegumentarySkin(value);
    }
    const handleMarkAsCompletePost = () => {
        const appointmentDate = new Date(selectedNextAptDate)
        const formData = new FormData();

        formData.append("bloodExam", bloodExam ? 1 : 0);
        formData.append("bloodExamResult", bloodExamResult);
        formData.append("distemperTest", distemperTest ? 1 : 0);
        formData.append("distemperTestResult", distemperTestResult);
        formData.append("earSwabbing", earSwabbing ? 1 : 0);
        formData.append("earSwabbingResult", earSwabbingResult);
        formData.append("ehrlichiaTest", ehrlichiaTest ? 1 : 0);
        formData.append("ehrlichiaTestResult", ehrlichiaTestResult);
        formData.append("heartwormTest", heartwormTest ? 1 : 0);
        formData.append("heartwormTestResult", heartwormTestResult);
        formData.append("parvoTest", parvoTest ? 1 : 0);
        formData.append("parvoTestResult", parvoTestResult);
        formData.append("skinScraping", skinScraping ? 1 : 0);
        formData.append("skinScrapingResult", skinScrapingResult);
        formData.append("stoolExam", stoolExam ? 1 : 0);
        formData.append("stoolExamResult", stoolExamResult);
        formData.append("ultrasound", ultrasound ? 1 : 0);
        formData.append("ultrasoundResult", ultrasoundResult);
        formData.append("urineExam", urineExam ? 1 : 0);
        formData.append("urineExamResult", urineExamResult);
        formData.append("vaginalSmear", vaginalSmear ? 1 : 0);
        formData.append("vaginalSmearResult", vaginalSmearResult);
        formData.append("eyeStrain", eyeStrain ? 1 : 0);
        formData.append("eyeStrainResult", eyeStrainResult);
        formData.append("xray", xray ? 1 : 0);
        formData.append("xrayResult", xrayResult);
        formData.append("otherTest", otherTest);
        formData.append("otherTestResult", otherTestResult);

        formData.append("genCon", genCon);
        formData.append("genAttitude", genAttitude);
        formData.append("hydration", hydration);
        formData.append("mucousMembrane", mucousMembrane);
        formData.append("headNeck", headNeck);
        formData.append("eyes", eyes);
        formData.append("ears", ears);
        formData.append("gastrointestinal", gastrointestinal);
        formData.append("urogenitals", urogenitals);
        formData.append("respiratory", respiratory);
        formData.append("circulatory", circulatory);
        formData.append("musculoskeleton", musculoskeleton);
        formData.append("lymphNodes", lymphNodes);
        formData.append("venousReturn", venousReturn);
        formData.append("integumentarySkin", integumentarySkin);

        formData.append("tentativeDiagnosis", tentativeDiagnosis);
        formData.append("finalDiagnosis", finalDiagnosis);
        formData.append("prognosis", prognosis);
        formData.append("vaccineGiven", vaccineGiven);
        formData.append("prescribedMed", prescribedMed);

        formData.append("weight", weight);
        formData.append("pulse", pulse);
        formData.append("respiratoryRate", respiratoryRate);
        formData.append("temp", temp);
        formData.append("diet", isEmptyOrSpaces(diet) ? "" : diet);
        formData.append("allergies", isEmptyOrSpaces(allergies) ? "" : allergies);
        formData.append("prevSurg", isEmptyOrSpaces(prevSurg) ? "" : prevSurg);
        formData.append("requestOrComplaints", isEmptyOrSpaces(request) ? "" : request);
        formData.append("medByOwner", isEmptyOrSpaces(medByOwner) ? "" : medByOwner);
        formData.append("medByOtherVet", isEmptyOrSpaces(medByOtherVet) ? "" : medByOtherVet);
        formData.append("procedure", isEmptyOrSpaces(procedure) ? "" : procedure);
        formData.append("selectedNextAptDate", selectedNextAptDate !== null ? `${appointmentDate.getFullYear()}-${appointmentDate.getMonth() + 1}-${appointmentDate.getDate()}` : "");
        formData.append("note", note);
        
        formData.append("appointmentId", appointmentId);

        axiosClient.post("/create-med-history", formData)
        .then(({data}) => {
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
            if(data.status === 200) {
                navigate("/AdminIndex/Appointments/Completed");
            }
        }).catch(error => console.error(error));
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

                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="note">Note (optional)</label>
                            <TextArea
                            id="note"
                            className="w-100"
                            size="large"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}/>
                        </div>
                    </div>

                    {/* <div className="mar-bottom-1">
                        <p>Next appointment time</p>
                        <div className="d-flex flex-wrap gap3">
                            {timeOptions.map(time => (
                                <Button
                                size="large"
                                key={time}
                                type={selectedNextAptTime === time ? "primary" : "default"}
                                onClick={() => setSelectedNextAptTime(time)}>
                                    {formatTime(time)}
                                </Button>
                            ))}
                        </div>
                    </div> */}
                </>
            )}

            {/**
             * Physical Exam
             */}
            {step === 1 && (
                <>
                    <div className="d-flex gap3 mar-bottom-2">
                        <Button type="primary" onClick={() => handleMarkAllPhyExamAs("N")}>Mark all as N</Button>
                        <Button type="primary" onClick={() => handleMarkAllPhyExamAs("AB")}>Mark all as AB</Button>
                        <Button type="primary" onClick={() => handleMarkAllPhyExamAs("NE")}>Mark all as NE</Button>
                    </div>
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
                    {LabExamFields.map((lab, index) => (
                        lab.title === "Other test"
                        ? (
                            <div key={index} className="mar-bottom-2">
                                <label htmlFor={`${index}-otherTest`}>Other Test: </label>
                                <Input 
                                className="mar-bottom-3"
                                id={`${index}-otherTest`}
                                size="large"
                                value={lab.testValue}
                                onChange={lab.setTestValue}
                                placeholder="other"/>

                                <label htmlFor={`${index}-otherTestResult`}>Other Test Result: </label>
                                <Input 
                                className="mar-bottom-3"
                                id={`${index}-otherTestResult`}
                                size="large"
                                value={lab.resultValue}
                                onChange={lab.setValue}
                                placeholder="result"/>
                            </div>
                        )
                        : (
                            <div key={index} className="mar-bottom-2">
                                <Checkbox
                                className="mar-bottom-3"
                                onChange={(e) => lab.setChecked(e.target.checked)}
                                >
                                    {lab.title}
                                </Checkbox><br/>

                                {lab.isChecked && !["Parvo Test", "Heartworm Test", "Distemper test"].some(test => lab.title.includes(test)) && (
                                    <>
                                        <label htmlFor={index}>Result: </label>
                                        <Input 
                                        id={index}
                                        size="large"
                                        value={lab.resultValue} 
                                        onChange={lab.setValue}
                                        placeholder="result"/>
                                    </>
                                )}
                                
                                {lab.isChecked && ["Parvo Test", "Heartworm Test", "Distemper test"].some(test => lab.title.includes(test)) && (
                                    <>
                                        <label htmlFor={index}>Result: </label><br/>
                                        <Radio.Group
                                        value={lab.resultValue}
                                        options={[
                                            {label: "Positive", value: "Positive"},
                                            {label: "Negative", value: "Negative"},
                                        ]}
                                        onChange={lab.setValue}/>
                                    </>
                                )}
                            </div>
                        )
                    ))}
                </>
            )}

            {/**
             * Diagnosis
             */}
             {step === 3 && (
                <>
                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="tentativeDiag">Tentative diagnosis</label>
                            <Input
                            id="tentativeDiag"
                            className="w-100"
                            min={0}
                            size="large"
                            value={tentativeDiagnosis}
                            onChange={(e) => {setTentativeDiagnosis(e.target.value)}}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="finalDiag">Final diagnosis</label>
                            <Input
                            id="finalDiag"
                            className="w-100"
                            size="large"
                            value={finalDiagnosis}
                            onChange={(e) => {setFinalDiagnosis(e.target.value)}}
                            />
                        </div>
                    </div>

                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="resporatoryRate">Prognosis</label>
                            <Radio.Group
                            options={[
                                {label: "Favorable", value: "Favorable"},
                                {label: "Unfavorable", value: "Unfavorable"},
                                {label: "Guarded", value: "Guarded"},
                            ]}
                            value={prognosis}
                            onChange={(e) => setPrognosis(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex gap1 mar-bottom-2">
                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="vacGiven">Vaccine Given</label>
                            <Input
                            id="vacGiven"
                            className="w-100"
                            min={0}
                            size="large"
                            value={vaccineGiven}
                            onChange={(e) => {setVaccineGiven(e.target.value)}}
                            />
                        </div>

                        <div className="d-flex flex-direction-y gap4 w-100">
                            <label htmlFor="presMed">Prescribed Medication</label>
                            <Input
                            id="presMed"
                            className="w-100"
                            size="large"
                            value={prescribedMed}
                            onChange={(e) => {setPrescribedMed(e.target.value)}}
                            />
                        </div>
                    </div>
                </>
             )}

            <div className="d-flex gap3 justify-content-end">
                {step > 0 && (<Button type="default" size="large" onClick={() => setStep(prev => prev - 1)}>Back</Button>)}
                {step > 2
                ? (<Button type="primary" disabled={isNextBtnDisabled()} size="large" onClick={handleMarkAsCompletePost}>Mark as Complete</Button>)
                : (<Button type="primary" disabled={isNextBtnDisabled()} size="large" onClick={() => setStep(prev => prev + 1)}>Next</Button>)}
            </div>
        </div>
    )
}