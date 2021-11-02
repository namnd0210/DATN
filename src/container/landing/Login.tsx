import { Button, Col, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';

import { Register } from './Register';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const {
    isAuthenticated,
    user: { role, name },
  } = useSelector((state) => state.auth);
  const history = useHistory();
  const setInvisible = () => {
    setVisible(false);
  };

  const handleLogin = (values: any) => {
    console.log(values);
    dispatch(login(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log(role, name);
      setTimeout(() => {
        role === 2 ? history.push('/home') : history.push('/exam');
      }, 1000);
    }
  }, [isAuthenticated, history, role, name]);

  return (
    <div className="login-main">
      <Col xl={16} className="login-form ">
        <h3 className="login-form__header">Đăng nhập</h3>
        {/* {error && error.trim() !== '' ? (
          <Alert
            message={error}
            type="error"
            closable
            style={{ marginBottom: '1rem' }}
          />
        ) : null} */}
        <Form name="login" onFinish={handleLogin}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <span style={{ marginLeft: 10 }}>
            Chưa có tài khoản,
            <span className="login-rediret" onClick={() => setVisible(true)}>
              Đăng kýc
            </span>
            ngay
          </span>
        </Form>
      </Col>

      <Register visible={visible} setInvisible={setInvisible} />
    </div>
  );
};

export default LoginScreen;
