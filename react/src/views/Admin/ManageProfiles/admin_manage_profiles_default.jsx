import { useEffect, useState } from "react";
import { fetchAllClientsNotDeleted } from "../../../services/UserClientsServices";
import { fetchAllAdminsNotDeleted } from "../../../services/UserAdminsServices";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import { Input, Spin } from "antd";
import { isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { fetchAllAdminRoles } from "../../../services/AdminTypesServices";
import { useModal } from "../../../contexts/ModalContext";

export default function AdminManageProfilesDefault() {
    const { showModal } = useModal();
    const { user } = useStateContext();
    const { Search } = Input;
    const { setActiveNavLink } = useOutletContext();

    const [activeTab, setActiveTab] = useState("Clients");

    const [adminRoles, setAdminRoles] = useState();
    const [admins, setAdmins] = useState(null);
    const [clients, setClients] = useState(null);
    const [filteredAdmins, setFilteredAdmins] = useState(null);
    const [filteredClients, setFilteredClients] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Manage Accounts");
        const getAll = async() => {
            const [clientsDb, adminsDb, adminRolesDb] = await Promise.all([
                fetchAllClientsNotDeleted(),
                fetchAllAdminsNotDeleted(user.id),
                fetchAllAdminRoles()
            ]);
            setAdmins(adminsDb);
            setClients(clientsDb);
            setFilteredAdmins(adminsDb);
            setFilteredClients(clientsDb);
            setAdminRoles(adminRolesDb);
        }

        getAll();
    }, []);



    /**
     * Handlers for Search
     */
    const handleSearch = (e) => {
        setFilteredClients(clients.filter(client =>
            client.fname.toLowerCase().includes(e.toLowerCase()) || client.lname.toLowerCase().includes(e.toLowerCase()) ||
            client.mname?.toLowerCase().includes(e.toLowerCase()) || client.email.toLowerCase().includes(e.toLowerCase())
        ));

        setFilteredAdmins(admins.filter(admin =>
            admin.fname.toLowerCase().includes(e.toLowerCase()) || admin.lname.toLowerCase().includes(e.toLowerCase()) ||
            admin.mname?.toLowerCase().includes(e.toLowerCase()) || admin.email.toLowerCase().includes(e.toLowerCase())
        ));
    }

    const onSearchInput = (e) => {
        if(isEmptyOrSpaces(e)) {
            setFilteredClients(clients);
            setFilteredAdmins(admins);
        }
    }



    /**
     * Handlers for Add Admin
     */
    const handleAddAdmin = () => {
        console.log("CHECK")
        showModal("AddAdminModal", {
            adminRoles,
            setAdmins,
            setFilteredAdmins
        });
    }




    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            {clients !== null && admins !== null
            ? (
                <>
                    <div className="d-flex justify-content-between align-items-center gap3">
                        <h3 className="mar-bottom-1">Manage Accounts</h3>
                        
                        {activeTab == "Admins" && (
                            <button 
                            onClick={handleAddAdmin}
                            className="primary-btn-blue1 d-flex gap3 align-items-center">
                                <RiUserAddLine/>
                                Add Admin
                            </button>
                        )}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex gap3 mar-bottom-1">
                            <Link to={''} 
                            className={`${activeTab === "Clients" ? "primary" : "secondary"}-btn-blue1`}>
                                Clients ({clients.length > 0 ? clients.length : ""})
                            </Link>
                            <Link to={'Admins'} 
                            className={`${activeTab === "Admins" ? "primary" : "secondary"}-btn-blue1`}>
                                Admins ({admins.length > 0 ? admins.length : ""})
                            </Link>
                        </div>

                        <Search
                        placeholder="Search Information" 
                        onSearch={handleSearch} 
                        enterButton
                        size="large"
                        style={{width: 400}}
                        onChange={(e) => onSearchInput(e.target.value)}
                        allowClear
                        />
                    </div>

                    <Outlet context={{
                        setActiveTab,
                        filteredAdmins, setFilteredAdmins,
                        filteredClients, setFilteredClients
                    }}/>
                </>
            )
            : (<Spin size="large"/>)}
        </div>
    );
}