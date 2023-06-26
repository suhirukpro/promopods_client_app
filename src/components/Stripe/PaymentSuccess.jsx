import { FiCheckCircle } from "react-icons/fi";
import "../../../src/index.css";
import RoutePaths from "../../../src/routes/RoutePaths";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
const PaymentSuccess = () => {
    const push = useNavigate();

    return (<><div className="payment-success-content row" style={{height: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center"}}>
       <div  className="row" >
        <div className="d-flex justify-content-center col-12">
        <h1>
        <FiCheckCircle ></FiCheckCircle>
        </h1>
        </div>
        <div className="d-flex justify-content-center col-12">
            <h1 style={{color:"green"}}>
            Payment Success
            </h1>
       
            </div>
          
        <div className="d-flex justify-content-center col-12">  <Button onClick={() => push(RoutePaths.salesOrders)} type="primary">
          OK
        </Button></div>
        
            </div>
        

    </div></>)
}

export default PaymentSuccess;