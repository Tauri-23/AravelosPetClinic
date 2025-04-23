import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchAllInventoryItems } from "../../../services/InventoryServices";
import { Spin, Input, Button, Table } from "antd";
import { formatToPhilPeso } from "../../../assets/js/utils";

export default function AdminInventoryIndex() {
    const navigate = useNavigate();

    const {setActivePage} = useOutletContext();
    const {Search} = Input;

    const [medicines, setMedicines] = useState(null);
    const [filteredMedicines, setFilteredMedicines] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActivePage("Inventory");
        const getAll = async() => {
            const [medicinesDb] = await Promise.all([
                fetchAllInventoryItems(),
            ]);
            setFilteredMedicines(medicinesDb);
            setMedicines(medicinesDb);
        }

        getAll();
    }, []);



    /**
     * handlers
     */
    const onSearch = () => {

    }



    /**
     * Columns
     */
    const medicinesColumns = [
        {
            title: "Medicine Id",
            dataIndex: "id"
        },
        {
            title: "Medicine Name",
            render: (_, value) => `${value.name} ${value.measurement_value} ${value.measurement_unit}`
        },
        {
            title: "QTY",
            dataIndex: "qty"
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (value) => formatToPhilPeso(value)
        },
        {
            title: "Status",
            dataIndex: "status",
            filters: [{ text: "active", value: "active" }, { text: "discountinued", value: "discountinued" }],
            onFilter: (value, record) => record.status === value
        }
    ]



    /**
     * Render
     */
    return(
        <>
            <div className="d-flex align-items-center justify-content-between mar-bottom-1">
                <Search 
                placeholder="input search text" 
                onSearch={onSearch}
                style={{width: 300}}
                enterButton 
                size="large"
                />

                <Button
                type="primary"
                size="large"
                onClick={() => navigate('../AddMedicine')}
                >
                    Add Medicine
                </Button>
            </div>

            {/* Medicines */}
            {!medicines || !filteredMedicines
            ? (
                <Spin size="large"/>
            )
            : (
                <Table
                columns={medicinesColumns}
                bordered
                dataSource={filteredMedicines}
                onRow={(record) => ({
                    onClick: () => navigate(`../ViewInventory/${record.id}`)
                })}/>
            )}
            
        </>
    )
}