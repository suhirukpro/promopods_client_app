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
  getCustomer,
  updateProfileImage,
  getProfileImage
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
  const [data, setData] = useState([]);

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  // const [image, setImage] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file)

      previewImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      debugger
      setImage(reader.result);
    };
  };


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
    phone: "",
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

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("myfile",selectedImage,selectedImage.name)

    var data = {
      imageId: 0,
      name: selectedImage.name,
      description: selectedImage.name,
      location: selectedImage.name,
      ImageData: image
    };

    const res = await updateProfileImage(data);
    if (res) {
      message.success("Profile successfully updated");
      await setValues({ ...initialValues });
    } else message.error(DEFAULT_ERROR_MESSAGE);
  }

    const updateUser = async () => {
      values.username = values.email
      const res = await updateCustomer({ ...values });
      if (res) {
        message.success("Profile successfully updated");
        await setValues({ ...initialValues });
        push(RoutePaths.singIn);
      } else message.error(DEFAULT_ERROR_MESSAGE);
    };


    const getUserProfileImage = async () => {
      values.username = values.email
      const res = await getProfileImage();
      if (res) {
        debugger
        // console.log(...res["imageData"]);
        var result = res["imageData"]
        debugger
        await setImage(result );
      } else message.error(DEFAULT_ERROR_MESSAGE);
    };

    const fetchUser = async () => {
      values.username = values.email
      const res = await getCustomer();
      if (res) {
        res.password = ""
        setValues({ ...res })
      } else message.error(DEFAULT_ERROR_MESSAGE);
    };

    const cancel = () => {

    }


    const emailHandler = (val) => {
      setValues({ ...values, email: val });
      if (EMAIL_VALIDATE_REGEX.test(val)) return setEmailValidationMsg("");
      setEmailValidationMsg("Please Enter Valid E-mail Address");
    };

    const mobileNumberHandler = (val) => {
      setValues({ ...values, phone: val });
      if (PHONE_VALIDATE_REGEX.test(val)) return setPhoneNumberValidationMsg("");
      setPhoneNumberValidationMsg("Please Enter Valid Phone Number");
    };

    const passwordHandler = (val) => {
      setValues({ ...values, password: val });
      if (PASSWORD_VALIDATION_REGEX.test(val) || val == "")
        return setPasswordValidationMsg("");
      setPasswordValidationMsg("Please Enter Strong Password");
    };

    useEffect(() => {
      fetchUser();
      getUserProfileImage();
    }, []);

    return (
      <div className="profile-container">
        <form>
          <h2>Profile</h2>
          {initialValues.companyName}
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
                    <br></br>
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
                    <br></br>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={values.phone}
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
                      disabled={true}
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
                    <li>{"At least one upper case English letter"}</li>
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
              <div className="row">
                <div className="col-12  d-flex justify-content-center">

                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    style={{ width: "300px", height: "300px", margin: "10px" }}
                  >
                    {image ? (
                      <img src={image} alt="preview" style={{ width: "100%", height: '100%' }} />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                      </svg>
                    )}

                  </div>



                </div>
                <div className="col-12 d-flex justify-content-center" style={{ paddingLeft: "60px" }} > <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                /></div>
              </div>

              <div className="col-12 d-flex justify-content-center p-3">
                <Button
                  type="primary"
                  onClick={onFileUpload}
                >
                  Upload
                </Button></div>
              {/* <div className="col-6 d-flex justify-content-end p-3"></div> */}



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
            <div className="col-10">
            </div>
            <div className="col-2 d-flex justify-content-end">
              <Button
                type="primary"
                disabled={
                  //!infoValidate(values) ||
                  !EMAIL_VALIDATE_REGEX.test(values?.email) ||
                  !PHONE_VALIDATE_REGEX.test(values?.phone) ||
                  !(PASSWORD_VALIDATION_REGEX.test(values?.password) || values?.password == "")
                }
                onClick={updateUser}
                className="m-2"
              >
                Save
              </Button>

              <Button
                type="error"
                onClick={cancel}
                className="m-2"
              >
                Cancel
              </Button>


            </div>

          </div>



        </form>
      </div>
    );
  };

  export default Profile;
