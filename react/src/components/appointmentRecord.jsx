import React from 'react';
import "../assets/css/appointmentRecord.css";

export default function AppointmentRecord({
    handleAppointmentRecordClick, record, handleCancel
}) {
    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];

    const serviceLabel = serviceOptions?.find(option => option.id === record.service)?.label || "Unknown Service";

    // Function to render the record based on status
    const renderRecordByStatus = () => {
        switch (record.status) {
            case 'Pending':
                return (
                    <div className='appt-record-three pending' onClick={() => handleAppointmentRecordClick(record)}>
                        <div className='content-deet'>{record.pet.name}</div>
                        <div className='content-deet'>{record.service.service ?? "Unknown Service"}</div>
                        <div className='content-deet'>
                            {new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                        </div>
                    </div>
                );
            case 'Approved':
                return (
                    <div className='appt-record-four approved' onClick={() => handleAppointmentRecordClick(record)}>
                        <div className='content-deet'>{record.pet.name}</div>
                        <div className='content-deet'>{record.service.service ?? "Unknown Service"}</div>
                        <div className='content-deet'>{new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}</div>
                        <div className='content-deet'>{new Date(record.approved_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}</div>
                        {/* <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{record.reason}</div>
                        <div>Status: Approved</div> */}
                    </div>
                );
            case 'Completed':
                return (
                    <div className='appt-record-three rejected' onClick={() => handleAppointmentRecordClick(record)}>
                        <div className='content-deet'>{record.pet.name}</div>
                        <div className='content-deet'>{record.service.service ?? "Unknown Service"}</div>
                        <div className='content-deet'>{new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}</div>
                    </div>
                );
            case 'Cancelled':
                return (
                    <div className='appt-record-five rejected' onClick={() => handleAppointmentRecordClick(record)}>
                        <div className='content-deet'>{record.pet.name}</div>
                        <div className='content-deet'>{record.service.service ?? "Unknown Service"}</div>
                        <div className='content-deet'>{new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}</div>
                        <div className='content-deet'>{new Date(record.cancelled_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}</div>
                        <div className='content-deet'>{record.reason}</div>
                        {/* <div>{recordRejectDate ? new Date(recordRejectDate).toLocaleString() : "N/A"}</div>
                        <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>Status: Rejected</div> */}
                    </div>
                );
            case 'Rejected':
                return (
                    <div className='appt-record-five rejected' onClick={() => handleAppointmentRecordClick(record)}>
                        <div className='content-deet'>{record.pet.name}</div>
                        <div className='content-deet'>{record.service.service ?? "Unknown Service"}</div>
                        <div className='content-deet'>{new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}</div>
                        <div className='content-deet'>{new Date(record.rejected_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}</div>
                        <div className='content-deet'>{record.reason}</div>
                        {/* <div>{new Date(recordRequestDate).toLocaleString()}</div>
                        <div>{recordCancelDate ? new Date(recordCancelDate).toLocaleString() : "N/A"}</div>
                        <div>{recordApprovedDate ? new Date(recordApprovedDate).toLocaleString() : "N/A"}</div>
                        <div>Status: Rejected</div> */}
                    </div>
                );
        }
    };

    return renderRecordByStatus();
}
