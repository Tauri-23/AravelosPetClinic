import { Button, Select } from "antd";
import { useState } from "react"
import * as Icon from "react-bootstrap-icons";


export default function ClientBookAptAddPetService({index, services, selectedServices, setSelectedServices, onClose}) {
    const [selectedService, setSelectedService] = useState({
        service: "",
        serviceType: ""
    });



    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        if(e.target.name === "service") {
            setSelectedService(prev => ({...prev, serviceType: ""}));
        }
        setSelectedService(prev => ({...prev, [e.target.name]: e.target.value}));
    }



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f bottom-margin-s" >
                    <Icon.X className="pointer" onClick={onClose}/>
                </div>

                <label htmlFor="service">Select Service</label>
                <Select
                name="service"
                id="service"
                size="large"
                className="w-100 mar-bottom-3"
                value={selectedService.service}
                onChange={(value) => handleInputChange({target: {name: "service", value: value}})}
                options={[
                    { label: "Select service", value: "" },
                    ...services
                    .map(service => ({
                        label: service.service,
                        value: service.id
                    }))
                ]}
                />

                {(selectedService.service !== "" 
                && services.find(service => service.id === selectedService.service).service_types.length > 0) 
                && (
                    <>
                        <label htmlFor="serviceType">Select Service Type</label>
                        <Select
                        name="serviceType"
                        id="serviceType"
                        size="large"
                        className="w-100 mar-bottom-1"
                        value={selectedService.serviceType}
                        onChange={(value) => handleInputChange({target: {name: "serviceType", value: value}})}
                        options={[
                            { label: "Select service type", value: "" },
                            ...services
                            .find(service => service.id === selectedService.service).service_types
                            .filter(serviceType => !selectedServices.some(x => x.id === serviceType.id))
                            .map(serviceType => ({
                                label: serviceType.service_type,
                                value: serviceType.id
                            }))
                        ]}
                        />
                    </>
                )}


                <Button
                size="large"
                type="primary"
                // disabled={selectedPet === ""}
                onClick={() => {
                    const filteredService = services.find(service => service.id === selectedService.service);
                    const filteredServiceType = filteredService.service_types.find(serviceType => serviceType.id === selectedService.serviceType);
                    setSelectedServices(prev => {
                        const updated = [...prev]; // clone the outer array
                        const currentServices = updated[index] || []; // get current services for that pet
                        updated[index] = [
                            ...currentServices,
                            {
                                serviceId: filteredService.id,
                                serviceName: filteredService.service,
                                serviceTypeId: filteredServiceType?.id || null,
                                serviceTypeName: filteredServiceType?.service_type || null
                            }
                        ];
                        return updated;
                    });
                    onClose();
                }}
                >
                    Select
                </Button>
            </div>
        </div>
    )
}