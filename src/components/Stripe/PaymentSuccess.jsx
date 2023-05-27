import { FiCheckCircle } from "react-icons/fi";
import "../../../src/index.css";
const PaymentSuccess = () => {

    return (<><div className="payment-success-content">
       
        <div className="d-flex justify-content-center">
        <FiCheckCircle ></FiCheckCircle>
        </div>
        <div className="d-flex justify-content-center">
        Success
            </div>
        

    </div></>)
}

export default PaymentSuccess;