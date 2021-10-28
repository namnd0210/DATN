import '../../assets/styles/register.scss';

import { Alert, Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/actions';
import { useSelector } from 'redux/reducer';

export const Register = ({ visible, setInvisible }: any) => {
  const { registerLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setInvisible(false);
  };

  const handleRegister = (values: any) => {
    dispatch(register(values));
  };

  return (
    <Modal visible={visible} title="Đăng ký" onCancel={handleCancel} footer={null}>
      <div className="register__modal">
        <Form name="basic" onFinish={handleRegister}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size="large" placeholder="Địa chỉ email" />
          </Form.Item>

          <Form.Item name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
            <Input size="large" placeholder="Tên" />
          </Form.Item>

          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input size="large" placeholder="Địa chỉ email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item name="passwordCheck" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Button type="primary" size="large" htmlType="submit" className="register_button" loading={registerLoading}>
            Xác nhận
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
