import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  InputNumber,
  Typography,
  message,
  DatePicker,
  Modal,
  Button,
  Select,
  Popover,
} from "antd";
import moment from "moment";
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineArrowRight,
  AiOutlineEye
} from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa";
import {
  DATA_NOT_FOUND,
  DATE_FORMAT,
  DEFAULT_ERROR_MESSAGE,
  SalesOrderHeadStatus,
} from "../../utils/constants";
import {
  createSalesOrderHead,
  deleteSalesOrderHead,
  getAllSalesOrderHeadsBydCustomer,
  updateSalesOrderHead,
} from "../../services/salesOrderHead";

import { getAllCustomerData } from "../../services/customer";
import { useDispatch } from "react-redux";
import { setSelectSalesOrderHead } from "../../redux/reducers/salesOrderHead";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../routes/RoutePaths";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import useTableSearch from "../../hooks/useTableSearch";
import Search from "antd/lib/transfer/search";
import { useSelector } from "react-redux";

const initialValues = {
  salesOrderHeadId: 0,
  salesOrderNumber: "",
  cohortNumber: "",
  customerId: null,
  companyName: "",
  salesOrderDate: moment().format(DATE_FORMAT),
  status: 1,
};

const { Option } = Select;

const SalesOrderHead = () => {
  const { authUser, userProfileImage, currentUser } = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const push = useNavigate();
  const key = "updatable";

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const [customer, setAllCustomer] = useState([]);
  const [values, setValues] = useState({
    ...initialValues,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, dataLoading } = useTableSearch({
    searchVal,
    data: data,
  });

  const fetchSalesOrderHead = async () => {
    try {
      messageApi.open({
        key,
        type: "loading",
        content: "Loading...",
      });
      const res = await getAllSalesOrderHeadsBydCustomer(currentUser.customerId);
      if (res?.length > 0) {
        messageApi.open({
          key,
          type: "Success",
          content: "Successfully Data Loaded.....",
        });
        return setData([...res]);
      }

      if (res?.length === 0) {
        setData([]);
        message.info(DATA_NOT_FOUND);
        messageApi.open({
          key,
          type: "warning",
          content: DATA_NOT_FOUND,
        });
        return;
      }
    } catch (error) {
      message.error(DEFAULT_ERROR_MESSAGE);
    }
  };



  const handleCustomer = (data, val) => {
    data.customerId = val;
    data.companyName = customer?.find((x) => x.customerId === val)?.companyName;
  };

  const handleStatus = (data, val) => {
    data.status = val;
  };

  const handleDatePickerChange = (data, date) => {
    data.salesOrderDate = moment(date).format(DATE_FORMAT);
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

      if (inputType === "companyName")
        return (
          <div>
            <Select
              style={{ width: 224 }}
              defaultValue={record?.companyName}
              onChange={(val) => handleCustomer(record, val)}
            >
              {customer?.map((x) => (
                <Option key={x.customerId} value={x.customerId}>
                  {x.companyName}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "status")
        return (
          <div>
            <Select
              style={{ width: 224 }}
              defaultValue={
                SalesOrderHeadStatus?.find((x) => x.value === record?.status)
                  ?.key
              }
              onChange={(val) => handleStatus(record, val)}
            >
              {SalesOrderHeadStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        );

      if (inputType === "salesOrderDate")
        return (
          <div>
            <DatePicker
              className="form-control"
              clearIcon={false}
              defaultValue={moment(record.salesOrderDate)}
              onChange={(val, dateString) =>
                handleDatePickerChange(record, val)
              }
            />
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

  const isEditing = (record) => record.salesOrderHeadId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.salesOrderHeadId);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(
        (item) => record.salesOrderHeadId === item.salesOrderHeadId
      );
      if (index > -1) {
        const updateData = data[index];
        row.customerId = updateData.customerId;
        row.companyName = updateData.companyName;
        row.salesOrderDate = updateData.salesOrderDate;
        row.status = updateData.status;
        const obj = {
          ...updateData,
          ...row,
        };
        const res = await updateSalesOrderHead({ ...obj });
        if (res) {
          message.success("Successfully update");
        } else {
          message.error(DEFAULT_ERROR_MESSAGE);
        }
        await fetchSalesOrderHead();
        await setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (salesOrderHeadId) => {
    const res = await deleteSalesOrderHead(salesOrderHeadId);
    if (res) {
      message.success("Successfully deleted record");
      await fetchSalesOrderHead();
    } else message.error(DEFAULT_ERROR_MESSAGE);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const res = await createSalesOrderHead({ ...values });
    if (res) {
      message.success("Record created successfully ");
      await fetchSalesOrderHead();
      await setIsModalVisible(false);
      await setValues({ ...initialValues });
    } else message.error(DEFAULT_ERROR_MESSAGE);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValues({ ...initialValues });
  };

  const navigation = (item) => {
    dispatch(setSelectSalesOrderHead(item));
    push(RoutePaths.salesOrder);
    dispatch(
      setMenuItem({
        menuKey: "13",
        openKeys: ["13"],
        url: RoutePaths.salesOrder,
      })
    );
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "salesOrderNumber",
      editable: false,
      key: "salesOrderNumber",
    },
    {
      title: "Cohort Number",
      dataIndex: "cohortNumber",
      editable: false,
      key: "cohortNumber",
    },
    // {
    //   title: "Company",
    //   dataIndex: "companyName",
    //   editable: true,
    //   key: "companyName",
    // },
    {
      title: "Order Date",
      dataIndex: "salesOrderDate",
      render: (salesOrderDate) => {
        return moment(salesOrderDate).format(DATE_FORMAT);
      },
      key: "salesOrderDate",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return SalesOrderHeadStatus?.find((x) => x.value === status)?.key;
      },
      editable: true,
      key: "status",
    },
    {
      title: "",
      dataIndex: "operation",
      width: 200,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button className="ms-2"
              onClick={() => navigation(record)}> View
              {/* <AiOutlineEye size={20} color={"#1890ff"} /> */}
            </Button>





          </>
        );
      },
    },
  ];

  const handleAdd = () => { };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "salesOrderDate"
            ? "salesOrderDate"
            : col.dataIndex === "companyName"
              ? "companyName"
              : col.dataIndex === "status"
                ? "status"
                : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const infoValidate = (obj) => {
    return Object.keys(obj).reduce(
      (res, k) =>
        res && (!!obj[k] || obj[k] === false || !isNaN(parseInt(obj[k]))),
      Object.keys(obj).length > 0
    );
  };

  useEffect(() => {
    fetchSalesOrderHead();
  }, []);

  return (
    <div>
      {contextHolder}

      <Modal
        title="Add Sales Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Add"}
        okButtonProps={{ disabled: false /*!infoValidate(values)*/ }}
      >
        {/* <div className="row mt-2">
          <div className="col-4">
            <label>{"Sales Order Number"}</label>
          </div>
          <div className="col-2">:</div>

          <div className="col-6">
            <Input
              className="form-control"
              value={values?.salesOrderNumber}
              onChange={(val) =>
                setValues({
                  ...values,
                  salesOrderNumber: val.target.value,
                })
              }
            />
          </div>
        </div> */}

        <div className="row mt-2">
          <div className="col-4">
            <label>{"Company"}</label>
          </div>
          <div className="col-2">:</div>

          <div className="col-6">
            <Select
              style={{ width: 224 }}
              value={values?.customerId}
              placeholder={"Select Company"}
              onChange={(val) =>
                setValues({
                  ...values,
                  customerId: val,
                  companyName: customer?.find((x) => x.customerId === val)
                    ?.companyName,
                })
              }
            >
              {customer?.map((x) => (
                <Option key={x.customerId} value={x.customerId}>
                  {x.companyName}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <label>{"Order Date"}</label>
          </div>
          <div className="col-2">:</div>

          <div className="col-6">
            <DatePicker
              className="form-control"
              clearIcon={false}
              value={moment(values.salesOrderDate)}
              onChange={(val, dateString) =>
                setValues({
                  ...values,
                  salesOrderDate: moment(val).format(DATE_FORMAT),
                })
              }
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <label>{"Status"}</label>
          </div>
          <div className="col-2">:</div>

          <div className="col-6">
            <Select
              style={{ width: 224 }}
              value={values?.status}
              placeholder={"Select Status"}
              onChange={(val) =>
                setValues({
                  ...values,
                  status: val,
                })
              }
            >
              {SalesOrderHeadStatus?.map((x) => (
                <Option key={x.value} value={x.value}>
                  {x.key}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
      <div  className="profile-container">
        <div className="row d-flex justify-content-between" >
          <h2 >Orders</h2>
          <hr></hr>

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
              dataSource={filteredData}
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
    </div>
  );
};

export default SalesOrderHead;
