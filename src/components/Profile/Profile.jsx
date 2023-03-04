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
} from "antd";
import {
  DEFAULT_ERROR_MESSAGE,
  UserRoles,
  EMAIL_VALIDATE_REGEX,
  PHONE_VALIDATE_REGEX,
  PASSWORD_VALIDATION_REGEX,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import { useDispatch } from "react-redux";

import {
  createCustomer,
  deleteCustomer,
  getAllCustomerData,
  updateCustomer,
} from "../../services/customer";

import { setAuthUser } from "../../redux/reducers/auth";
import RoutePaths from "../../routes/RoutePaths";
import "../Profile/Profile.css";

const Profile = () => {
  const push = useNavigate();
  const dispatch = useDispatch();
  const [emailValidationMsg, setEmailValidationMsg] = useState("");
  const [phoneNumberValidationMsg, setPhoneNumberValidationMsg] = useState("");
  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
  const { Panel } = Collapse;
  const initialValues = {
    customerId: 0,
    userId: 0,
    companyName: "",
    customerAddress: "",
    customerAddressLineOne: "",
    customerAddressLineTwo: "",
    customerCity: "",
    customerPostcode: "",
    deliveryAddress: "",
    deliveryAddressLineOne: "",
    deliveryAddressLineTwo: "",
    deliveryCity: "",
    deliveryPostcode: "",
    invoiceAddress: "",
    invoiceAddressLineOne: "",
    invoiceAddressLineTwo: "",
    invoiceCity: "",
    invoicePostcode: "",
    forenames: "",
    surname: "",
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    userRoleId: UserRoles.Customer,
    imageId: null,
    currentFile: undefined,
    previewImage: undefined,
    progress: 0,
    message: "",

    imageInfos: [],

  };




  const [values, setValues] = useState({
    ...initialValues,
  });

  const infoValidate = (obj) => {
    return Object.keys(obj).reduce(
      (res, k) =>
        res && (!!obj[k] || obj[k] === false || !isNaN(parseInt(obj[k]))),
      Object.keys(obj).length > 0
    );
  };

  const selectFile = (event) => {
    debugger
    setValues({ ...values, currentFile: event.target.files[0] })
    setValues({ ...values, previewImage: URL.createObjectURL(event.target.files[0]) })
    setValues({ ...values, progress: 0 })
    setValues({ ...values, message: "" })
  }




  const updateUser = async () => {
    values.username = values.email
    const res = await createCustomer({ ...values });
    if (res) {
      message.success("Profile successfully updated");
      await setValues({ ...initialValues });
      push(RoutePaths.singIn);
    } else message.error(DEFAULT_ERROR_MESSAGE);
  };

  const cancel = ()=>{
    
  }


  const emailHandler = (val) => {
    setValues({ ...values, email: val });
    if (EMAIL_VALIDATE_REGEX.test(val)) return setEmailValidationMsg("");
    setEmailValidationMsg("Please Enter Valid E-mail Address");
  };

  const mobileNumberHandler = (val) => {
    setValues({ ...values, mobile: val });
    if (PHONE_VALIDATE_REGEX.test(val)) return setPhoneNumberValidationMsg("");
    setPhoneNumberValidationMsg("Please Enter Valid Phone Number");
  };

  const passwordHandler = (val) => {
    setValues({ ...values, password: val });
    if (PASSWORD_VALIDATION_REGEX.test(val))
      return setPasswordValidationMsg("");
    setPasswordValidationMsg("Please Enter Strong Password");
  };

  return (
    <div className="profile-container">
      <form>
        <h2>Profile</h2>
        <hr></hr>
        <br></br>
        <div className="row">
          <div className="col-6">
            {/* Company Info
            <hr></hr> */}
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label>Company</label>
                  <input
                    type="text"
                    value={values.companyName}
                    onChange={(e) =>
                      setValues({ ...values, companyName: e.target.value })
                    }
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
              </div>




              <div className="col-12">
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={values.mobile}
                    onChange={(e) => mobileNumberHandler(e.target.value)}
                  />
                  <p className="validation-msg">{phoneNumberValidationMsg}</p>
                </div>
              </div>


              <div className="col-12">

              </div>


              <div className="col-12">
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={values.email}
                    disabled="true"
                    onChange={(e) => emailHandler(e.target.value)}
                  />
                  <p className="validation-msg">{emailValidationMsg}</p>
                </div>
              </div>


              <div className="col-12">
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => passwordHandler(e.target.value)}
                    value={values.password}
                  />
                  <p className="validation-msg">{passwordValidationMsg}</p>
                </div>

                <label className="validation-msg">{"Note:"}</label>
                <ul>
                  <li className="h6">{"At least one upper case English letter"}</li>
                  <li>{"At least one lower case English letter"}</li>
                  <li>{"At least one digit"}</li>
                  <li>{"At least one special character"}</li>
                  <li>{"Minimum eight in length"}</li>
                </ul>
              </div>


              <div className="col">

              </div>
            </div>
          </div>
          <div className="col-6">

            <div className="col-8">
              <label className="btn btn-default p-0">
                <input type="file" accept="image/*" onChange={(e) => selectFile(e)} />
              </label>
            </div>


            <div className="col-4">
              <button
                className="btn btn-success btn-sm"
                disabled={!values.currentFile}
              // onClick={this.upload}
              >

                Upload
              </button>
            </div>


            <div className="progress my-3">
              {values.previewImage}
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={values.progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: values.progress + "%" }}
              >

                {values.progress}%
              </div>
            </div>


            {values.previewImage && (
              <div>
                TEST
                <img className="preview" src={values.previewImage} alt="" />
              </div>
            )}
          </div>

          <div className="col">


            <Collapse defaultActiveKey={["1"]}>

              <Panel header="Customer Address" key="1"><div className="row">
                <div className="mb-3 col-6">
                  <label>Street Address</label>
                  <input
                    type="text"
                    value={values.customerAddressLineOne}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        customerAddressLineOne: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="Street Address"
                  />
                </div>
                <div className="mb-3 col-6">
                  <label>Street Address Line 2</label>
                  <input
                    type="text"
                    value={values.customerAddressLineTwo}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        customerAddressLineTwo: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="Street Address Line 2"
                  />
                </div>
                <div className="mb-3 col-6">
                  <label>City</label>
                  <input
                    type="text"
                    value={values.customerCity}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        customerCity: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="mb-3 col-6">
                  <label>Postcode</label>
                  <input
                    type="text"
                    value={values.customerPostcode}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        customerPostcode: e.target.value,
                      })
                    }
                    className="form-control"
                    placeholder="Postcode"
                  />
                </div>
              </div>
              </Panel>
              <Panel header="Delivery Address" key="2">
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={values.deliveryAddressLineOne}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          deliveryAddressLineOne: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>Street Address Line 2</label>
                    <input
                      type="text"
                      value={values.deliveryAddressLineTwo}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          deliveryAddressLineTwo: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Street Address Line 2"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>City</label>
                    <input
                      type="text"
                      value={values.deliveryCity}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          deliveryCity: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>Postcode</label>
                    <input
                      type="text"
                      value={values.deliveryPostcode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          deliveryPostcode: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Postcode"
                    />
                  </div>
                </div>
              </Panel>
              <Panel header="Invoice Address" key="3">
                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={values.invoiceAddressLineOne}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          invoiceAddressLineOne: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>Street Address Line 2</label>
                    <input
                      type="text"
                      value={values.invoiceAddressLineTwo}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          invoiceAddressLineTwo: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Street Address Line 2"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>City</label>
                    <input
                      type="text"
                      value={values.invoiceCity}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          invoiceCity: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>Postcode</label>
                    <input
                      type="text"
                      value={values.invoicePostcode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          invoicePostcode: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Postcode"
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>

          </div>
        </div>




        <div className="row">
          <div className="col-6">
          </div>
          <div className="col-6">
            <div className="d-grid">
              <div className="row">
                <div className="col-6">
                  <Button
                    type="primary"
                    disabled={
                      //!infoValidate(values) ||
                      !EMAIL_VALIDATE_REGEX.test(values?.email) ||
                      !PHONE_VALIDATE_REGEX.test(values?.mobile) ||
                      !PASSWORD_VALIDATION_REGEX.test(values?.password)
                    }
                    onClick={updateUser}
                  >
                    Save
                  </Button>
                </div>
                <div className="col-6">
                <Button
                type="error"
                onClick={cancel}
              >
                Cancel
              </Button>
                </div>

              </div>
              <br></br>

            
            </div>

            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </div>

        </div>



      </form>
    </div>
  );
};

export default Profile;
