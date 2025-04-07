import React from 'react';
import { Calendar, Select } from 'antd';
import dayjs from 'dayjs';

const CalendarCustom = ({ appointments, setSelectedAppointments, width }) => {

    const getListData = (value) => {
        const date = new Date(value);
        return appointments.filter(x => {
            const xDate = new Date(x.date_time);
            return (
                xDate.getFullYear() === date.getFullYear() &&
                xDate.getMonth() === date.getMonth() &&
                xDate.getDate() === date.getDate()
            );
        });
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div>
                {listData.map(item => (
                    <div key={item.id}>
                        <small style={{ fontSize: 18 }} className='fw-bold'>{item.pet.name}</small><br />
                        <small>{item.service.service} - {item.id}</small>
                    </div>
                ))}
            </div>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    // Remove "Year" button from header
    const headerRender = ({ value, onChange }) => {
        const current = value;

        const months = Array.from({ length: 12 }, (_, i) => ({
            label: dayjs().month(i).format('MMM'),
            value: i,
        }));

        const years = Array.from({ length: 10 }, (_, i) => {
            const year = dayjs().year() - 5 + i;
            return {
                label: year,
                value: year,
            };
        });

        return (
            <div className='d-flex gap3 justify-content-end mar-bottom-1'>
                <Select
                    size='large'
                    style={{width: 150}}
                    value={current.year()}
                    options={years}
                    onChange={(newYear) => onChange(current.clone().year(newYear))}
                />
                <Select
                    size='large'
                    style={{width: 150}}
                    value={current.month()}
                    options={months}
                    onChange={(newMonth) => onChange(current.clone().month(newMonth))}
                />
                {/* Removed the "Month"/"Year" view buttons intentionally */}
            </div>
        );
    };



    /**
     * Handlers
     */
    const onSelect = (value) => {
        const selectedDate = new Date(value);

        // Get matching appointments
        const matchingAppointments = appointments.filter(x => {
            const xDate = new Date(x.date_time);
            return (
                xDate.getFullYear() === selectedDate.getFullYear() &&
                xDate.getMonth() === selectedDate.getMonth() &&
                xDate.getDate() === selectedDate.getDate()
            );
        });

        console.log(matchingAppointments);

        setSelectedAppointments(matchingAppointments || []);
    }



    /**
     * Render
     */
    return <Calendar style={{width: width}} cellRender={cellRender} onSelect={onSelect} headerRender={headerRender} />;
};

export default CalendarCustom;
