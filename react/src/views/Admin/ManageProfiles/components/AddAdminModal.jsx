import { Button, DatePicker, Input, Select, Upload } from "antd";
import React from "react";
import { useState } from "react"
import { XLg } from "react-bootstrap-icons";
import { BsUpload } from "react-icons/bs";
import { isEmptyOrSpaces, notify } from "../../../../assets/js/utils";
import axiosClient from "../../../../axios-client";
import { RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function AddAdminModal({adminRoles, setAdmins, setFilteredAdmins, onClose}) {
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminDOB, setAdminDOB] = useState(null);
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [pic, setPic] = useState(null);



    /**
     * Handlers
     */
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            notify("error", "Not an image file", "top-center", 3000);
        }
        return isImage || Upload.LIST_IGNORE; // Prevents non-image files from being added
    };

    const handleUploadPic = ({ file }) => {
        setPic(file.originFileObj)
    }

    const isAddBtnDisabled = () => {
        return isEmptyOrSpaces(fname) || isEmptyOrSpaces(lname) ||
        isEmptyOrSpaces(email) || isEmptyOrSpaces(password) ||
        isEmptyOrSpaces(gender) || isEmptyOrSpaces(address) ||
        isEmptyOrSpaces(phone) || role === null || 
        adminDOB == null || pic == null;
    }

    const handleAddAdmin = () => {
        const bdate = new Date(adminDOB);
        
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("mname", mname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("adminDOB", `${bdate.getFullYear()}-${bdate.getMonth() + 1}-${bdate.getDate()}`);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("role", role);
        formData.append("pic", pic);
    
        axiosClient.post("/create-admin", formData)
        .then(({data}) => {
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
            if(data.status === 200) {
                setAdmins(prev => [...prev, data.admin]);
                setFilteredAdmins(prev => [...prev, data.admin]);
                onClose();
            }
        }).catch(e => {
            notify("error", "Something went wrong", "top-center", 3000); 
            console.error(e);
        });
    }

    



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box2">
                <div className="position-absolute cursor-pointer">
                    <XLg size={30} cursor="pointer" onClick={onClose}/>
                </div>
                <h3 className="text-center mar-bottom-1">Add Admin</h3>

                {/**
                 * Fullname
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-3">
                    <div className="w-100">
                        <label htmlFor="fname">Firstname</label>
                        <Input
                        id="fname"
                        className="w-100"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="e.g. Juan"
                        size="large"
                        />
                    </div>

                    <div className="w-100">
                        <label htmlFor="mname">Middlename (optional)</label>
                        <Input
                        id="mname"
                        className="w-100"
                        value={mname}
                        onChange={(e) => setMname(e.target.value)}
                        placeholder="e.g. Digo"
                        size="large"
                        />
                    </div>

                    <div className="w-100">
                        <label htmlFor="lname">Lastname</label>
                        <Input
                        id="lname"
                        className="w-100"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="e.g. Santos"
                        size="large"
                        />
                    </div>
                </div>

                {/**
                 * Credentials
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-3">
                    <div className="w-100">
                        <label htmlFor="email">Email</label>
                        <Input
                        id="email"
                        className="w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="xxx@xxx.xxx"
                        size="large"
                        />
                    </div>

                    <div className="w-100">
                        <label htmlFor="password">Password</label>
                        <Input.Password
                        id="password"
                        className="w-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        size="large"
                        />
                    </div>
                </div>

                {/**
                 * Gender & BDate
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-3">
                    <div className="w-100">
                        <label htmlFor="gender">Gender</label>
                        <Select
                        id="gender"
                        className="w-100"
                        value={gender}
                        onChange={(e) => setGender(e)}
                        size="large"
                        options={[
                            {label: "Select a Gender", value: ""},
                            {label: "Male", value: "Male"},
                            {label: "Female", value: "Female"}
                        ]}/>
                    </div>

                    <div className="w-100">
                        <label htmlFor="bdate">Birthdate</label>
                        <DatePicker
                        id="bdate"
                        className="w-100"
                        value={adminDOB}
                        onChange={(e) => setAdminDOB(e)}
                        size="large"
                        />
                    </div>
                </div>

                {/**
                 * Contact Information and Address
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-3">
                    <div className="w-100">
                        <label htmlFor="phone">Phone Number</label>
                        <Input
                        id="phone"
                        className="w-100"
                        value={phone}
                        onChange={(e) => {if(isNaN(e.target.value)) {return} setPhone(e.target.value)}}
                        maxLength={11}
                        placeholder="09XXXXXXXX"
                        size="large"
                        />
                    </div>

                    <div className="w-100">
                        <label htmlFor="address">Address</label>
                        <Input
                        id="address"
                        className="w-100"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="[Barangay] [City/Municipality]"
                        size="large"
                        />
                    </div>
                </div>

                {/**
                 * Roles
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-3">
                    <div className="w-100">
                        <label htmlFor="gender">Role</label>
                        <Select
                        id="gender"
                        className="w-100"
                        value={role}
                        onChange={(e) => setRole(e)}
                        size="large"
                        options={[
                            {label: "Select Role", value: ""},
                            ...adminRoles.map(role => ({label: role.role, value: role.id}))
                        ]}/>
                    </div>
                </div>

                {/**
                 * PFP
                 */}
                <div className="d-flex align-items-center gap3 mar-bottom-2">
                    <div className="w-100">
                        <div className="mar-bottom-3">Profile Picture</div>
                        <Upload
                        beforeUpload={beforeUpload}
                        onChange={handleUploadPic}
                        listType="picture"
                        maxCount={1}>
                            <Button icon={<BsUpload />} size="large">Upload</Button>
                        </Upload>
                    </div>
                </div>

                <Button 
                disabled={isAddBtnDisabled()} 
                size="large" 
                className="w-100" 
                type="primary"
                onClick={handleAddAdmin}>
                    Add Admin
                </Button>
            </div>
        </div>
    )
}