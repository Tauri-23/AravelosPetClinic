import React from 'react';
import "../assets/css/appointmentRecord.css";

export default function AppointmentRecord({
    handleAppointmentRecordClick,
    recordPetName,
    recordPetPic,
    recordService,
    serviceOptions,
    recordSchedule,
    recordRequestDate,
    recordCancelDate,
    recordApprovedDate,
    recordRejectDate,
    recordReason,
    recordStatus
}) {
    const serviceLabel = serviceOptions?.find(option => option.id === recordService)?.label || "Unknown Service";
 // Function to render the record based on status
    const renderRecordByStatus = () => {
        switch (recordStatus) {
            case 'Pending':
                return (
                    <div className='appt-record-three pending' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, serviceOptions, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{recordPetName}</div>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        {/* <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{recordReason}</div>
                        <div>Status: Pending</div> */}
                    </div>
                );
            case 'Approved':
                return (
                    <div className='appt-record-four approved' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{recordPetName}</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        <div className='content-deet'>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        {/* <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{recordReason}</div>
                        <div>Status: Approved</div> */}
                    </div>
                );
            case 'Completed':
                return (
                    <div className='appt-record-three rejected' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{recordPetName}</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        {/* <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{recordReason}</div>
                        <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>Status: Rejected</div> */}
                    </div>
                );
            case 'Cancelled':
                return (
                    <div className='appt-record-five rejected' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{recordPetName} (Rejected)</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        <div className='content-deet'>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div className='content-deet'>{recordReason}</div>
                        {/* <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>Status: Rejected</div> */}
                    </div>
                );
            case 'Rejected':
                return (
                    <div className='appt-record-five rejected' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{recordPetName} (Rejected)</div>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        <div className='content-deet'>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div className='content-deet'>{recordReason}</div>
                        {/* <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>Status: Rejected</div> */}
                    </div>
                );
            default:
                return (
                    <div className='appt-record' onClick={() => handleAppointmentRecordClick(recordPetName, recordPetPic, recordService, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)}>
                        <div className='content-deet'>{recordPetName}</div>
                        <div className='content-deet'>{serviceLabel}</div>
                        <div className='content-deet'>{new Date(recordSchedule).toLocaleString()}</div>
                        <div className='content-deet'>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div className='content-deet'>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div className='content-deet'>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div className='content-deet'>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div className='content-deet'>{recordReason}</div>
                        <div className='content-deet'>Status: {recordStatus}</div>
                    </div>
                );
        }
    };

    return renderRecordByStatus();
}
