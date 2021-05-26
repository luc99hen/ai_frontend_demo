import { Layout, Menu } from 'antd';
import logo from "./images/logo.png"

const { Header, Content, Footer } = Layout;


export default function StaticLayout(props){
    return  <Layout className="layout">
    <Header>
      <div className="logo">
        <img alt="" src={logo}  className="logo-png"></img>
        AI演示平台
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item className="menu-item" key="1">人种识别算法</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="outter-content">{props.children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>太仓市人种识别项目 ©2021 来自同济团队</Footer>
  </Layout>
}