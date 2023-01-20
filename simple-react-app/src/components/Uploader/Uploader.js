import "./Uploader.css";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload, Select, message } from "antd";
import axios from "axios";

const Uploader = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [hideUploaded, setHideUploaded] = useState(true);
  const [chosenOption, setChosenOption] = useState("signup");

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      style: {
        marginTop: "18vh",
      },
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
      style: {
        marginTop: "18vh",
      },
    });
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("image", file);
    fmData.append("option", chosenOption);

    try {
      axios
        .post(
          "https://us-central1-gcp-university-project.cloudfunctions.net/students-group-api/",
          fmData,
          config
        )
        .then((resp) => {
          onSuccess("Ok");
          success(resp.data);
        })
        .catch((err) => {
          onError({ err });
          let message = "Error";
          if (err.response.data) {
            message = err.response.data;
          } else {
            message = err.message;
          }
          error(message);
        });
      setTimeout(() => {
        setHideUploaded(false);
      }, 3500);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
      error("Request failed!");
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    setHideUploaded(true);
    setDefaultFileList(fileList);
  };

  const handleSelectChange = (value) => {
    setHideUploaded(true);
    setChosenOption(value);
  };

  return (
    <>
      <div id="form-div">
        {contextHolder}
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size="large"
        >
          <Select
            value={chosenOption}
            style={{ width: "278px" }}
            onChange={handleSelectChange}
            options={[
              {
                label: "Sign up for Student Research Group",
                value: "signup",
              },
              {
                label: "Resign from Student Research Group",
                value: "resign",
              },
            ]}
          />
          <div id="uploader-div">
            <Upload
              accept=".png, .jpg"
              customRequest={uploadImage}
              onChange={handleOnChange}
              listType="picture"
              defaultFileList={defaultFileList}
              style={{ width: "278px" }}
              maxCount={1}
              showUploadList={hideUploaded}
            >
              <Button
                icon={<UploadOutlined />}
                style={{ marginBottom: "10px", width: "278px", height: "80px" }}
              >
                Upload scan of your student card
              </Button>
            </Upload>
          </div>
        </Space>
      </div>
    </>
  );
};
export default Uploader;
