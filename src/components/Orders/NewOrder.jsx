import React, { useState, useEffect } from "react";
import { Col, message, Row } from "antd";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    InputNumber,
    Typography,
    Modal,
    Button,
    Divider,
    Collapse,
    Select
} from "antd";

import { useNavigate } from "react-router-dom";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import { useDispatch } from "react-redux";
import { getAllCohortData } from "../../services/cohort"
import { getAllCohortDeliveryByCohort,getAllCohort } from "../../services/cohortDelivery"

import "../Profile/Profile.css";

const initialValues = {
    cohortId: 0,
    deliveryMonth: 0,
    quantity: 0,
    deliveryMothodId: 0
}

const NewOrder = () => {
    const push = useNavigate();
    const dispatch = useDispatch();
    const [cohort, setAllCohort] = useState([]);
    const [deliveryMonths, setDeliveryMonths] = useState([]);
    const [deliveryMethods, setdeliveryMethods] = useState([]);
    const { Option } = Select;
    const [values, setValues] = useState({
        ...initialValues,
    });
    const [selectedCohortId, setSelectedCohortId] = useState(0);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(0);
    const [selectedCohortDeliveryId, setSelectedCohortDeliveryId] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [noOfYears, setNoOfYears] = useState(0);

    const fetchCohort = async () => {
        const res = await getAllCohort();
        debugger
        if (res?.length > 0) setAllCohort([...res]);
        else setAllCohort([]);
    };


    const fetchCohortDeliveriesByCohort = async (corhortId) => {
        const res = await getAllCohortDeliveryByCohort(corhortId);
        if (res?.length > 0) {
            setDeliveryMonths([...getDeliveryMonth(res)])
            console.log(getDeliveryMonth(res));
        } else {
            setDeliveryMonths([])
        }
    };

    const getDeliveryMonth = (corhortDeliveries) => {
        var deliverMonths = []

        corhortDeliveries.forEach(corhortDelivery => {
            deliverMonths.push({ id: corhortDelivery.cohortDeliveryId, month: new Date(corhortDelivery.signupDeadline).toLocaleString('default', { month: 'long' }) })
        });
        return deliverMonths;
    };

    const onSelectCohort= async (selectedCohortId)=>{
        setSelectedCohortId({ selectedCohortId })
        await fetchCohortDeliveriesByCohort(selectedCohortId);
    }



    useEffect(async () => {
        await fetchCohort();
        // await fetchCohortDeliveriesByCohort(1);
        setdeliveryMethods([{ value: "Bulk", displayValue: "Bulk" }, { value: "Individual", displayValue: "Individual" }])
    }, []);

    return (
        <div className="profile-container">

            {/* <Modal
                title="New Order"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Proceed to Pay"}

            >
                <form>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>{"Cohort"}</label>
                        </div>
                        <div className="col-2">:</div>

                        <div className="col-6">
                            <Select
                                style={{ width: "100%" }}
                                value={selectedCohortId.val}
                                placeholder={"Select Cohort"}
                                onChange={(val) => setSelectedCohortId({ val })}
                            >
                                {cohort?.map((x) => (
                                    <Option key={x.cohortId} value={x.cohortId}>
                                        {x.cohortNumber}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>{"Delivery Month"}</label>
                        </div>
                        <div className="col-2">:</div>

                        <div className="col-6">
                            <Select
                                style={{ width: "100%" }}
                                value={selectedCohortDeliveryId.val}
                                placeholder={"Select Month"}
                                onChange={(val) => setSelectedCohortDeliveryId({ val })}
                            >
                                {deliveryMonths?.map((x) => (
                                    <Option key={x.id} value={x.month}>
                                        {x.month}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>{"Delivery Method"}</label>
                        </div>
                        <div className="col-2">:</div>

                        <div className="col-6">
                            <Select
                                style={{ width: "100%" }}
                                value={selectedDeliveryMethod.val}
                                placeholder={"Select Method"}
                                onChange={(val) => setSelectedDeliveryMethod({ val })}
                            >
                                {deliveryMethods?.map((x) => (
                                    <Option key={x.value} value={x.value}>
                                        {x.displayValue}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>{"Quantity"}</label>
                        </div>
                        <div className="col-2">:</div>

                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantity}

                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <label>{"No of years"}</label>
                        </div>
                        <div className="col-2">:</div>

                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="No of years"
                                value={noOfYears}

                            />
                        </div>
                    </div>
                </form >
            </Modal> */}









            <form>
                <h2>New Order</h2>
                {initialValues.companyName}
                <hr></hr>
                <br></br>
                <div className="row">
                    <div className="col-4">
                        <label>Cohort</label>
                        <Select
                            style={{ width: "100%" }}
                            value={selectedCohortId.val}
                            placeholder={"Select Cohort"}
                            onChange={(val) => onSelectCohort(val) }
                        >
                            {cohort?.map((x) => (
                                <Option key={x.cohortId} value={x.cohortId}>
                                    {x.cohortNumber}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    {/* </div>
                    <div className="row"> */}

                    <div className="col-4">
                        <label>Quantity</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Quantity"
                            value={quantity}

                        />
                    </div>
                    {/* </div>
                    <div className="row"> */}
                    <div className="col-4">
                    </div>

                    {/* </div>
                    <div className="row"> */}
                    <div className="col-4">
                       
                        <div className="form-group">
                        <label>Delivery Month</label>
                            <Select
                            style={{ width: "100%" }}
                            value={selectedCohortDeliveryId.val}
                            placeholder={"Select Month"}
                            onChange={(val) => setSelectedCohortDeliveryId({ val })}
                        >
                            {deliveryMonths?.map((x) => (
                                <Option key={x.id} value={x.month}>
                                    {x.month}
                                </Option>
                            ))}
                        </Select>
                        </div>
                        
                    </div>

                    {/* </div>
                <div className="row"> */}


                    <div className="col-4">
                        <label>Delivery Method</label>
                        <Select
                            style={{ width: "100%" }}
                            value={selectedDeliveryMethod.val}
                            placeholder={"Select Method"}
                            onChange={(val) => setSelectedDeliveryMethod({ val })}
                        >
                            {deliveryMethods?.map((x) => (
                                <Option key={x.value} value={x.value}>
                                    {x.displayValue}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    {/* </div>
                <div className="row"> */}
                    <div className="col-4">
                        <label>No of years</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="No of years"
                            value={noOfYears}

                        />
                    </div>
                </div>
            </form >

        </div >
    );

}





export default NewOrder;
