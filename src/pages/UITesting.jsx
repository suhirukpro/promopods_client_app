import { Button, Col, Modal, Row, Upload } from "antd";
import React from "react";
import { useState } from "react";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import _ from "lodash";
import fileSize from "../utils/helper/fileSize";
import "./UITesting.css";

const EXCEL_FILE_TYPE =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const UITestingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedRequirementDataFiles, setUploadedRequirementDataFiles] =
    useState([]);

  //Image Upload
  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          //Base 64 Result---> reader.result
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob((result) => resolve(result));
          };
        };
      });
    },
  };

  //File upload
  const removeFile = (file) => {
    const remainFiles = uploadedRequirementDataFiles.filter(
      (item) => item.id !== file.id
    );
    setUploadedRequirementDataFiles(remainFiles);
  };

  const onSubmit = async () => {
    const formData = new FormData();

    //formData.append("fleetID", String(fleet?.id)); // Append fields
    formData.append("file", _.get(uploadedRequirementDataFiles, "[0].file"));


    // const res = await importBasicData(formData);
    // if (res) {
    //   //API Call Response
    // }
    return;
  };

  const requirementDataUpload = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    const fs = [...files].map((item, i) => {
      return {
        id: i,
        name: item.name,
        size: item.size,
        formatSize: fileSize(item.size),
        type: item.type,
        file: item,
      };
    });
    setUploadedRequirementDataFiles(fs);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <Button className="mt-5" onClick={() => setIsModalVisible(true)}>
        {"Upload File"}
      </Button>
      <Modal
        title="Upload File"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Add"}
        footer={null}
      >
        <>
          <Row>
            <Col span={8}>Data File :</Col>
            <Col span={16}>
              <div className={"file-upload-container"}>
                <ul>
                  {uploadedRequirementDataFiles &&
                  uploadedRequirementDataFiles?.length ? (
                    uploadedRequirementDataFiles.map((file, index) => {
                      return (
                        <li key={String(index)}>
                          <div className="file-container">
                            <div>{file.name}</div>
                            <div className="ms-1 file-size">
                              {file.formatSize}
                            </div>
                            <div
                              className="ms-1 file-upload-delete-btn"
                              onClick={() => removeFile(file)}
                            >
                              <DeleteOutlined color="#FF0000" />
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <div>
                      <label
                        htmlFor="basic-data-input"
                        className="d-flex"
                        role="button"
                      >
                        <div className="upload-btn px-2">
                          <UploadOutlined />
                          <span className="ms-1">Choose File</span>
                        </div>
                      </label>
                      <input
                        id="basic-data-input"
                        type="file"
                        accept={EXCEL_FILE_TYPE}
                        onChange={(e) => requirementDataUpload(e)}
                        className="d-none"
                      />
                    </div>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <Button onClick={onSubmit} className="float-end me-1">
              {"Upload"}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default UITestingPage;
