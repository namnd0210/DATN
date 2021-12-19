import '../assets/styles/layout.scss';

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import { menus } from 'constants/menu';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';

import logo from '../assets/imgs/l.svg';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const LayoutWrapper = (props: { children: React.ReactChild }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const dispatch = useDispatch();
  const {
    user: { name, role },
  } = useSelector((state) => state.auth);

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

  return (
    <Layout style={{ minHeight: '100vh' }} className="layout-main">
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="main-header">
            <img src={logo} alt="" />
            <ul>
              {menus.map(
                (e, i) =>
                  e.role.includes(role) && (
                    <li key={i}>
                      <Link to={e.link}>{e.title}</Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <Dropdown overlay={menu} className="header-user">
            <div ref="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <img src="https://img.icons8.com/color/25/000000/user-male.png" alt="user" />{' '}
              <div style={{ marginLeft: '10px', color: '#000' }}>Xin chào {name}</div>
            </div>
          </Dropdown>
        </Header>

        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <div className="bg-search"></div>
            <hr />
            <Content style={{ margin: '0 200px' }}>{props.children}</Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Duc Nam</Footer>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
