import * as Icon from 'react-bootstrap-icons';
import { Table } from "antd";
import { useEffect, useState } from 'react';
import { formatDate, getAge } from '../../assets/js/utils';

export function VaccineCardModal({ pet, medHists, onClose }) {

    const vaccineCardColumns = [
        {
            title: "Age",
            dataIndex: "age"
        },
        {
            title: "Date Given",
            render: (_, row) => formatDate(row.created_at)
        },
        {
            title: "Weight",
            dataIndex: "weight",
        },
        {
            title: "Vaccine/s",
            render: (_, row) => row.diagnosis.vaccine_given
        },
        {
            title: "Next Dose",
            render: (_, row) => row.next_appointment_date ? formatDate(row.next_appointment_date) : "N/A"
        },
    ];

    return (
        <div className="modal1">
            <div className="modal-box4">
                <div className="d-flex justify-content-between">
                    <h4>{pet.name}'s Vaccine Card</h4>
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <hr className='mar-y-3' />

                <Table
                    columns={vaccineCardColumns}
                    dataSource={medHists.map((item, index) => ({ ...item, key: index, age: getAge(pet.dob)}))}
                    bordered
                />
            </div>
        </div>
    );
}
