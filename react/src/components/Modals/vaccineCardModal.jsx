import * as Icon from 'react-bootstrap-icons';
import { Table } from "antd";

export function VaccineCardModal({ pet, onClose }) {

    const [pets, setPetAppts] = useState(null);


    useEffect(() => {
        setActiveNavLink("Profile");

        const getAllAppts = async () => {
            try {
                const [petApptsDb] = await Promise.all([
                    fetchAllAppointmentsWherePetandStatus(pet.id, "Completed"),
                ])
            } catch (error) {
                console.error(error);
            }
        };
        getAllPets();


    }, []);

    const vaccineCardColumns = [
        {
            title: "Age",

        },
        {
            title: "Date Given",
            dataIndex: "dateGiven",
        },
        {
            title: "Weight",
            dataIndex: "weight",
        },
        {
            title: "Vaccine/s",
            dataIndex: "vaccines",
        },
        {
            title: "Next Dose",
            dataIndex: "nextDose",
        },
    ];

    // You can replace this with wherever your records are stored
    const vaccineRecords = pet?.vaccineRecords || [];

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
                    dataSource={vaccineRecords.map((item, index) => ({ ...item, key: index }))}
                    bordered
                />
            </div>
        </div>
    );
}
