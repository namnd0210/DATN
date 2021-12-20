import '../assets/styles/layout.scss';

import { FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import useParams from 'hooks/useParams';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { logout } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';

import logo from '../assets/imgs/l.svg';
import { menus, translateData } from './menu.layout';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const LayoutWrapper = (props: { children: React.ReactChild }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const { pathname } = useParams();
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

  useEffect(() => {
    if (pathname) {
      setBreadcrumb(pathname.split('/'));
    }
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }} className="layout-main">
      <Layout className="site-layout">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider theme="light" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo" />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
              {menus.map((e: any) => {
                if (e.items.length === 0) {
                  return (
                    e.role.includes(role) && (
                      <Menu.Item key={e.title} icon={<FileOutlined />}>
                        <Link to={e.link}>{e.title}</Link>
                      </Menu.Item>
                    )
                  );
                }

                return (
                  <SubMenu key={e.title} title={e.title} icon={<TeamOutlined />}>
                    {e.items.map(
                      (k: any) =>
                        k.role.includes(role) && (
                          <Menu.Item key={k.title} icon={<PieChartOutlined />}>
                            <Link to={k.link}>{k.title}</Link>
                          </Menu.Item>
                        ),
                    )}
                  </SubMenu>
                );
              })}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />

            <div style={{ padding: '0 2rem' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumb.map((e: any) => (
                  <Breadcrumb.Item>{translateData[e]}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>

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
