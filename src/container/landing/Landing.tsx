import '../../assets/styles/landing.scss';

import { Col, Layout, Row } from 'antd';
import React from 'react';

import { LoginScreen } from './Login';

const { Content } = Layout;

export const Landing = () => {
  return (
    <Layout>
      <Content className="site-layout">
        <Row className="login">
          <Col xl={8} offset={4} className="login-intro">
            <h1>Study smarter with Exam.vn</h1>
            <div>
              Practice thousands of Multiple choice Question created by students
              and teachers
            </div>
          </Col>
          <Col xl={12}>
            <LoginScreen />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Landing;
