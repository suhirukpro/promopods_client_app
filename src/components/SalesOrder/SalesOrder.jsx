import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Form,
  InputNumber,
  Typography,
  message,
  Button,
  Select,
  Popover,
} from "antd";
import moment from "moment";
import {
  AiOutlineArrowLeft,
} from "react-icons/ai";
import {
  DATA_NOT_FOUND,
  DATE_FORMAT,
  DEFAULT_ERROR_MESSAGE,
  SalesOrderLineStatus,
} from "../../utils/constants";
import {
  getAllSalesOrderLineData
} from "../../services/salesOrderLine";

import { getAllSalesOrderHeadsBydCustomer, getSalesOrderHeadsById, getSalesOrderPayment } from "../../services/salesOrderHead";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import RoutePaths from "../../routes/RoutePaths";

const initialValues = {
  salesOrderLineId: 0,
  salesOrderHeadId: null,
  salesOrderNumber: "",
  cohortDeliveryId: null,
  quantity: 0,
  artworkReceivedStatus: 1,
  individualMailReceivedStatus: 1,
  artworkAddGiftApprovalStatus: 1,
  artworkSupplierApprovalStatus: 1,
  cohortDeliveryDto: {
    cohortDeliveryId: null,
    cohortId: null,
    cohortNumber: "",
    productId: null,
    productName: "",
    description: "",
    signupDeadline: moment().format(DATE_FORMAT),
    artworkDeadline: moment().format(DATE_FORMAT),
    individualMailReceivedDeadline: moment().format(DATE_FORMAT),
    artworkAddGiftApprovalDeadline: moment().format(DATE_FORMAT),
    artworkSupplierApprovalDeadline: moment().format(DATE_FORMAT),
    individualDelDate: moment().format(DATE_FORMAT),
    bulkDelDate: moment().format(DATE_FORMAT),
  },
  status: 1,
};

const { Option } = Select;

const SalesOrderLine = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const { selectSalesOrderHead } = useSelector((state) => state.salesOrderHead);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [payment, setPayment] = useState({});
  const [salesOrderHead, setAllSalesOrderHead] = useState([]);
  const [cohortNumber, setCohortNumber] = useState("");
  const [cohortDelivery, setAllCohortDelivery] = useState([]);
  const [values, setValues] = useState({
    ...initialValues,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const fetchSalesOrderById = async () => {
    const res = await getSalesOrderHeadsById(selectSalesOrderHead.salesOrderHeadId);
    if (res != null) {
      buildTableData(res.salesOrderLines)
    }
  }

  const fetchSalesOrderPayment = async () => {
    const res = await getSalesOrderPayment(selectSalesOrderHead.salesOrderHeadId);
    if (res != null) {
      

      var paymentExcludingTax = 0;
      res.paymentLines.forEach(paymentLine => {
        paymentExcludingTax+= paymentLine.priceExcludingTax
      });

      debugger
      var payment = {};
      payment['deliveryCost'] = res.deliveryCost
      payment['priceExcludingTax'] = paymentExcludingTax
      payment['tax'] = res.tax
      payment['grandTotal'] = payment.priceExcludingTax+payment.tax+payment.deliveryCost
      setPayment({...payment})
    }
  }





  const buildTableData = (salesOrderLines) => {
    try {


      var salesOrderlines = salesOrderLines
      if (salesOrderlines.length > 0) {
        let filterData = salesOrderLines;



        salesOrderLines.forEach(element => {

          if (element.salesOrderNumber === selectSalesOrderHead?.salesOrderNumber) {

            if (selectSalesOrderHead.deliveryMethod == "Individual") {
              if (element.cohortDeliveryDto && element.cohortDeliveryDto.individualDelDate != null) {
                element.deliveryDate = new Date(element.cohortDeliveryDto.individualDelDate)
                setCohortNumber(element.cohortDeliveryDto.cohortNumber)
              }

            } else {
              if (element.cohortDeliveryDto && element.cohortDeliveryDto.bulkDelDate != null) {
                element.deliveryDate = new Date(element.cohortDeliveryDto.bulkDelDate)
                setCohortNumber(element.cohortDeliveryDto.cohortNumber)
              }
            }
          }


        });


        salesOrderLines = salesOrderLines?.filter(
          (o) => o.salesOrderNumber === selectSalesOrderHead?.salesOrderNumber
        );




        return setData([...salesOrderLines]);
      }

      if (salesOrderlines?.length === 0) {
        setData([]);
        message.info(DATA_NOT_FOUND);
        return;
      }
    } catch (error) {
      message.error(DEFAULT_ERROR_MESSAGE);
    }
  };








  const fetchSalesOrderHead = async () => {
    const res = await getAllSalesOrderHeadsBydCustomer(currentUser.customerId);




    if (res?.length > 0) setAllSalesOrderHead([...res]);
    else setAllSalesOrderHead([]);
  };

  // const fetchCohortDelivery = async () => {
  //   const res = await getAllCohortDeliveryData();
  //   if (res?.length > 0) setAllCohortDelivery([...res]);
  //   else setAllCohortDelivery([]);
  // };

  const handleArtworkReceivedStatus = (data, val) => {
    data.artworkReceivedStatus = val;
  };

  const handleIndividualMailReceivedStatus = (data, val) => {
    data.individualMailReceivedStatus = val;
  };

  const handleArtworkAddGiftApprovalStatus = (data, val) => {
    data.artworkAddGiftApprovalStatus = val;
  };

  const handleArtworkSupplierApprovalStatus = (data, val) => {
    data.artworkSupplierApprovalStatus = val;
  };

  const handleStatus = (data, val) => {
    data.status = val;
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const fieldMapping = () => {
      if (inputType === "number") return <InputNumber />;

      if (inputType === "artworkReceivedStatus")
        return (
          <div>
            <Select
              style={{ width: 150 }}
              defaultValue={
                SalesOrderLineStatus?.find(
                  (x) => x.value === record?.artworkReceivedStatus
                )?.key
              }
              onChange={(val) => handleArtworkReceivedStatus(record, val)}
            >
              {SalesOrderLineStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "individualMailReceivedStatus")
        return (
          <div>
            <Select
              style={{ width: 150 }}
              defaultValue={
                SalesOrderLineStatus?.find(
                  (x) => x.value === record?.individualMailReceivedStatus
                )?.key
              }
              onChange={(val) =>
                handleIndividualMailReceivedStatus(record, val)
              }
            >
              {SalesOrderLineStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "artworkAddGiftApprovalStatus")
        return (
          <div>
            <Select
              style={{ width: 150 }}
              defaultValue={
                SalesOrderLineStatus?.find(
                  (x) => x.value === record?.artworkAddGiftApprovalStatus
                )?.key
              }
              onChange={(val) =>
                handleArtworkAddGiftApprovalStatus(record, val)
              }
            >
              {SalesOrderLineStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "artworkSupplierApprovalStatus")
        return (
          <div>
            <Select
              style={{ width: 150 }}
              defaultValue={
                SalesOrderLineStatus?.find(
                  (x) => x.value === record?.artworkSupplierApprovalStatus
                )?.key
              }
              onChange={(val) =>
                handleArtworkSupplierApprovalStatus(record, val)
              }
            >
              {SalesOrderLineStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "status")
        return (
          <div>
            <Select
              style={{ width: 150 }}
              defaultValue={
                SalesOrderLineStatus?.find((x) => x.value === record?.status)
                  ?.key
              }
              onChange={(val) => handleStatus(record, val)}
            >
              {SalesOrderLineStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      return <Input />;
    };
    const inputNode = fieldMapping();

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.salesOrderLineId === editingKey;







  const columns = [
    // {
    //   title: "Sales Order Number",
    //   dataIndex: "salesOrderNumber",
    //   editable: false,
    //   key: "salesOrderNumber",
    // },
    // {
    //   title: "Cohort Number",
    //   dataIndex: "cohortNumber",
    //   editable: false,
    //   key: "cohortNumber",
    //   render: (_, obj) => {
    //     return <>{obj.cohortDeliveryDto.cohortNumber}</>;
    //   },
    // },
    {
      title: "Cohort Delivery Desc",
      dataIndex: "description",
      editable: false,
      key: "description",
      render: (_, obj) => {
        return <>{obj.cohortDeliveryDto.description}</>;
      },
    },
    {
      title: "Product",
      dataIndex: "productName",
      editable: false,
      key: "productName",
      render: (_, obj) => {
        return <>{obj.cohortDeliveryDto.productName}</>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
      key: "quantity",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      editable: true,
      render: (deliveryDate) => {
        return moment(deliveryDate).format(DATE_FORMAT);
      },
      key: "deliveryDate",
    },
    {
      title: "Artwork Received Status",
      dataIndex: "artworkReceivedStatus",

      editable: true,
      key: "artworkReceivedStatus",
      render: (artworkReceivedStatus, obj) => {
        return (
          <>
            {artworkReceivedStatus == 1 ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "green",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            ) : artworkReceivedStatus == 2 &&
              obj.cohortDeliveryDto.artworkDeadline >=
              moment().format(DATE_FORMAT) ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "darkorange",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            ) : (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "red",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Individual Mail Received Status",
      dataIndex: "individualMailReceivedStatus",
      editable: true,
      key: "individualMailReceivedStatus",
      render: (individualMailReceivedStatus, obj) => {
        return (
          <>
            {individualMailReceivedStatus == 1 ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "green",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === individualMailReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            ) : individualMailReceivedStatus == 2 &&
              obj.cohortDeliveryDto.individualMailReceivedDeadline >=
              moment().format(DATE_FORMAT) ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "darkorange",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === individualMailReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            ) : (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "red",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === individualMailReceivedStatus
                    )?.key
                  }
                </span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Artwork AddGift Approval Status",
      dataIndex: "artworkAddGiftApprovalStatus",
      editable: true,
      key: "artworkAddGiftApprovalStatus",
      render: (artworkAddGiftApprovalStatus, obj) => {
        return (
          <>
            {artworkAddGiftApprovalStatus == 1 ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "green",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkAddGiftApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            ) : artworkAddGiftApprovalStatus == 2 &&
              obj.cohortDeliveryDto.artworkAddGiftApprovalDeadline >=
              moment().format(DATE_FORMAT) ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "darkorange",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkAddGiftApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            ) : (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "red",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkAddGiftApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Artwork Supplier Approval Status",
      dataIndex: "artworkSupplierApprovalStatus",
      editable: true,
      key: "artworkSupplierApprovalStatus",
      render: (artworkSupplierApprovalStatus, obj) => {
        return (
          <>
            {artworkSupplierApprovalStatus == 1 ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "green",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkSupplierApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            ) : artworkSupplierApprovalStatus == 2 &&
              obj.cohortDeliveryDto.artworkSupplierApprovalDeadline >=
              moment().format(DATE_FORMAT) ? (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "darkorange",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkSupplierApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            ) : (
              <div
                className="d-flex"
                style={{
                  borderRadius: 4,
                  background: "red",
                  color: "white",
                }}
              >
                <span className="ms-2 mt-1 mb-1">
                  {
                    SalesOrderLineStatus?.find(
                      (x) => x.value === artworkSupplierApprovalStatus
                    )?.key
                  }
                </span>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return SalesOrderLineStatus?.find((x) => x.value === status)?.key;
      },
      editable: true,
      key: "status",
    },

  ];


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "artworkReceivedStatus"
            ? "artworkReceivedStatus"
            : col.dataIndex === "individualMailReceivedStatus"
              ? "individualMailReceivedStatus"
              : col.dataIndex === "artworkAddGiftApprovalStatus"
                ? "artworkAddGiftApprovalStatus"
                : col.dataIndex === "artworkSupplierApprovalStatus"
                  ? "artworkSupplierApprovalStatus"
                  : col.dataIndex === "status"
                    ? "status"
                    : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),

    };
  });



  const navigation = () => {
    push(RoutePaths.salesOrders);
    dispatch(
      setMenuItem({
        menuKey: "9",
        openKeys: ["9"],
        url: RoutePaths.salesOrders,
      })
    );
  };

  useEffect(() => {
    setPayment({
      'deliveryCost':0,
      'priceExcludingTax':0,
      'tax':0,
      'grandTotal':0,  
  })
    fetchSalesOrderById();
    fetchSalesOrderPayment();

  }, []);

  return (
    <div>

      <div className="profile-container">
        <div className="row d-flex justify-content-between" >
          <h2 style={{ width: "500px" }}>Order : {selectSalesOrderHead.salesOrderNumber
          }</h2>
          {selectSalesOrderHead && (
            <div className="d-flex justify-content-end " style={{ width: "300px" }}>
              <div className="ms-2 " style={{
                alignItems: "center",
                display: "flex"
              }}>
                <Typography.Link disabled={editingKey !== ""} className={"ms-2"} >
                  <Popover content={"Back to Sales Orders"} title="Navigation">
                    <AiOutlineArrowLeft size={20} onClick={() => navigation()} />
                  </Popover>
                </Typography.Link>
                
              </div>
              <div className="ms-2" style={{
                alignItems: "center",
                display: "flex"
              }} onClick={() => navigation()}>{"Back to Orders"}</div>
            </div>
          )}
        </div>

        <hr></hr>
        <br></br>



        {payment != null && (<div className="table-wrapper row" style={{ background: "white", margin: "0px 0px", padding: "15px 20px" }}>
          <div className="col">
            <h5>Order Details</h5>
            <hr></hr>
            <div className="row" >
              <div className="col-3" >
                <div className="form-group">
                  <label>Order Date </label>
                </div>
              </div>
              <div className="col-9" >
                <div className="form-group">
                  <label>: <b>{moment(selectSalesOrderHead.salesOrderDate).format(DATE_FORMAT)
                  }</b></label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                <div className="form-group">
                  <label>Cohort Number</label>
                </div>
              </div>
              <div className="col-9">
                <div className="form-group">
                  <label> : <b>{cohortNumber
                  }</b></label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                <div className="form-group">
                  <label>Delivery Method</label>
                </div>
              </div>
              <div className="col-9">
                <div className="form-group">
                  <label>: <b>{selectSalesOrderHead.deliveryMethod
                  }</b></label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                  <div className="form-group">
                    <label>Status </label>
                  </div>
              </div>
              <div className="col-9">
                  <div className="form-group">
                    <label> : <b>{(selectSalesOrderHead.status == 1) ? "Active" : "Inactive"
                    }</b></label>
                  </div>
              </div>
            </div>
          </div>

          <div className="col">
            <h5>Payment</h5>
            <hr></hr>
            <div className="row" >
              <div className="col-3" >
                <div className="form-group">
                  <label>Item(s) Subtotal </label>
                </div>
              </div>
              <div className="col-9" >
                <div className="form-group">
                  <label>: £{
                  (payment!=null && payment.hasOwnProperty('priceExcludingTax'))?
                  payment.priceExcludingTax.toFixed(2):0
                  }</label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                <div className="form-group">
                  <label>Shipping Cost</label>
                </div>
              </div>
              <div className="col-9">
                <div className="form-group">
                  <label> : £{
                           (payment!=null && payment.hasOwnProperty('deliveryCost'))?
                     payment.deliveryCost.toFixed(2):0
                  }</label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                <div className="form-group">
                  <label>VAT</label>
                </div>
              </div>
              <div className="col-9">
                <div className="form-group">
                  <label>: £{
                         (payment!=null && payment.hasOwnProperty('tax'))?
                   payment.tax.toFixed(2):0
                  }</label>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row" >
              <div className="col-3">
                  <div className="form-group">
                    <label>Grand total </label>
                  </div>
              </div>
              <div className="col-9">
                  <div className="form-group">
                    <label> : £{
                           (payment!=null && payment.hasOwnProperty('grandTotal'))?
                     payment.grandTotal.toFixed(2):0
                    } </label>
                  </div>
              </div>
            </div>
          </div>





          


          {/* <div className="col" hidden="true" style={{ background: "white", margin: "0px 16px", padding: "0px 20px" }}>
            <br></br>
            <div className="row" >
              <div className="col-1" >
                <div className="form-group">
                  <label>Order Date </label>
                </div>
              </div>
              <div className="col-5" >
                <div className="form-group">
                  <label>: <b>{moment(selectSalesOrderHead.salesOrderDate).format(DATE_FORMAT)
                  }</b></label>
                </div>
              </div>
              <div className="col-1">
                <div className="form-group">
                  <label>Cohort Number</label>
                </div>
              </div>
              <div className="col-5">
                <div className="form-group">
                  <label> : <b>{cohortNumber
                  }</b></label>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row" >
              <div className="col-1">
                <div className="form-group">
                  <label>Delivery Method</label>
                </div>
              </div>
              <div className="col-5">
                <div className="form-group">
                  <label>: <b>{selectSalesOrderHead.deliveryMethod
                  }</b></label>
                </div>
              </div>
              <div className="col-1">
                <div className="col">
                  <div className="form-group">
                    <label>Status </label>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="col">
                  <div className="form-group">
                    <label> : <b>{(selectSalesOrderHead.status == 1) ? "Active" : "Inactive"
                    }</b></label>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </div> */}
        </div>
        )}
        <br></br>

        <div className={"mt-2"}>
          {data?.length === 0 && (
            <Button
              style={{ margin: "5px 0" }}
              onClick={() => setIsModalVisible(true)}
            >
              {"Add"}
            </Button>
          )}
          <div className="table-wrapper-overflow">
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                rowClassName="editable-row"
                bordered
                dataSource={data}
                columns={mergedColumns}
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "15"],
                }}




              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderLine;
