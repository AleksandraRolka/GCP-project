import "./Layout.css";
import { Layout as LayoutAntd, Image } from "antd";
import { Link } from "react-router-dom";
import Uploader from "../Uploader/Uploader";

const { Header, Footer, Content } = LayoutAntd;

const Layout = () => {
  return (
    <>
      <LayoutAntd id="layout-container">
        <Header id="header">
          <Link to="/">
            <Image
              id="logo-img"
              src={require("./../../assets/logo-img.png")}
              height={100}
              alt="Logo"
              preview={false}
            />
          </Link>
          {/* <span id="app-header">Simple app using Vision API from GCP</span> */}
          <span id="app-header">Simple app with Google Vision API</span>
        </Header>
        <Content id="content">
          <Uploader />
        </Content>
        <Footer id="footer">
          @ 2022 Sabre Academy University Course Project
        </Footer>
      </LayoutAntd>
    </>
  );
};
export default Layout;
