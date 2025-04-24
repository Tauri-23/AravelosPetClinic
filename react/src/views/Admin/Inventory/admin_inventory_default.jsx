import { Button } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function AdminInventoryDefault() {
    const {setActiveNavLink} = useOutletContext();

    const [activePage, setActivePage] = useState("Inventory");

    const navigate = useNavigate();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Inventory Tracking");
    }, []);



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            <h2 className="mar-bottom-1 fw-bold">Medicine Inventory Tracking</h2>

            <div className="d-flex align-items-center gap3 mar-bottom-1">
                <Button
                type={activePage === "Inventory" ? "primary" : "default"}
                size="large"
                onClick={() => navigate("")}
                >
                    Inventory
                </Button>
                <Button
                type={activePage === "History" ? "primary" : "default"}
                size="large"
                onClick={() => navigate("History")}
                >
                    History
                </Button>
            </div>

            <Outlet context={{setActivePage}}/>
        </div>
    );
}