// import {
// 	DesktopOutlined,
// 	UserOutlined,
// 	DashboardOutlined,
// } from "@ant-design/icons";
import '../assets/styles/layout.scss';

import { Dropdown, Layout, Menu } from 'antd';
import { menus } from 'constants/menu';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';

import logo from '../assets/imgs/l.svg';

const { Header, Content, Footer } = Layout;
// const { SubMenu } = Menu;

export const LayoutWrapper = (props: { children: React.ReactChild }) => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.auth);
  // const [collapsed, setcollapsed] = useState(false);
  // const toggle = () => {
  // 	setcollapsed(!collapsed);
  // };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="change-password">Đổi mật khẩu</Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => dispatch(logout())}>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );

  // useEffect(() => {
  // 	console.log(role);
  // }, [])

  return (
    <Layout style={{ minHeight: '100vh' }} className="layout-main">
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="main-header">
            <img src={logo} alt="" />
            <ul>
              {menus.map((e, i) => (
                <li key={i}>
                  <Link to={e.link}>{e.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Dropdown overlay={menu} className="header-user">
            <div ref="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <img src="https://img.icons8.com/color/25/000000/user-male.png" alt="user" />{' '}
              <div style={{ marginLeft: '10px', color: '#000' }}>Xin chào {name}</div>
            </div>
          </Dropdown>
        </Header>
        <div className="bg-search">
          {/* <div className="container">
            <div className="text" style={{ display: "none" }}>
              Search for anything
            </div> */}
          {/* <div className="input-wrap">
								<input placeholder="Course, Document,..."/>
							</div> */}
          {/* </div> */}
        </div>
        <hr />
        <Content style={{ margin: '0 10px' }}>{props.children}</Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Duc Nam</Footer>
      </Layout>
    </Layout>
  );
};