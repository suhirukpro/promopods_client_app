import React, { useState, useEffect } from "react";
import { message } from "antd";
import {
    Button,
    Select
} from "antd";
import { checkout } from "../Stripe/Checkout.js"
import {
    createSession
} from "../../services/customer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSalesOrderHead } from "../../services/salesOrderHead"
import { getAllCohortDeliveryByCohort, getAllCohort } from "../../services/cohortDelivery"
import { useSelector } from "react-redux";
import "../Profile/Profile.css";
import { loadStripe } from "@stripe/stripe-js";
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
    const { authUser, userProfileImage, currentUser } = useSelector((state) => state.auth);
    const fetchCohort = async () => {
        const res = await getAllCohort();
        
        if (res?.length > 0) setAllCohort([...res]);
        else setAllCohort([]);
    };


    let stripePromise;

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
        }
        return stripePromise;
    };

    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const item = {
        'description': 'Description of item',
        'images': ['https://example.com/t-shirt.png'],
        'amount': 500,
        'currency': 'gbp',
        'quantity': 1
    };

    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };



    const redirectToCheckout = async (session) => {
        setLoading(true);
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        console.log("Stripe checkout error", error);
        if (error) setStripeError(error.message);
        setLoading(false);
    };


    if (stripeError) alert(stripeError);


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
            deliverMonths.push({ id: corhortDelivery.cohortDeliveryId, month: new Date(corhortDelivery.signupDeadline).toLocaleString('default', { month: 'long', year: 'numeric' }) })
        });
        return deliverMonths;
    };

    const onSelectCohort = async (selectedCohortId) => {
        setSelectedCohortId(selectedCohortId)
        await fetchCohortDeliveriesByCohort(selectedCohortId);
    }

    const saveSalesOrder = async () => {
        var salesOrder = {
            cohortId: selectedCohortId,
            selectedStartCohortDeliveryId: selectedCohortDeliveryId,
            status: 1,
            quantity: quantity,
            numberOfYears: noOfYears,
            SalesOrderNumber: 'TEST',
            customerId: authUser.customerId,
            deliveryMethod: selectedDeliveryMethod
        }
        
        const res = await createSalesOrderHead(salesOrder);


        if (res) {
            redirectToCheckout(res)
            // message.success("Order successfully created");
        }
    }




    // useEffect(async () => {

    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchCohort();
        }
        fetchData();
        setdeliveryMethods([{ value: "Bulk", displayValue: "Bulk" }, { value: "Individual", displayValue: "Individual" }])

    }, []);

    return (
        <div className="profile-container">

            <h2>New Order</h2>
            {initialValues.companyName}
            <hr></hr>
            <div className="row" style={{ background: "white" }}>
                <form>

                    <br></br>
                    <div className="row">
                        <div className="col-4">
                            <label>Cohort</label>
                            <Select
                                style={{ width: "100%" }}
                                value={selectedCohortId.val}
                                placeholder={"Select Cohort"}
                                onChange={(val) => onSelectCohort(val)}
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
                                onChange={(e) => {
                                    setQuantity(e.target.value)
                                }}

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
                                    onChange={(val) => setSelectedCohortDeliveryId(val)}
                                >
                                    {deliveryMonths?.map((x) => (
                                        <Option key={x.id} value={x.id}>
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
                                onChange={(val) => {
                                    
                                    setSelectedDeliveryMethod(val)
                                }}
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
                                onChange={(e) => {
                                    setNoOfYears(e.target.value)
                                }}

                            />
                        </div>
                        <div className="col-12 d-flex justify-content-end p-3">
                            <Button
                                type="primary"
                                onClick={saveSalesOrder}
                            >
                                Save
                            </Button></div>
                        {/* <button
                            className="checkout-button"
                            onClick={redirectToCheckout}
                            disabled={isLoading}
                        >
                            <div className="grey-circle">
                                <div className="purple-circle">
                                    <img className="icon" alt="credit-card-icon" />
                                </div>
                            </div>
                            <div className="text-container">
                                <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
                            </div>
                        </button> */}
                    </div>
                </form >
            </div>
        </div >
    );

}





export default NewOrder;
