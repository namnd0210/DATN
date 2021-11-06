import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/user/actions';

const { Option } = Select;

const UserFormModal = ({ setVisible, visible, currentUser }: any) => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (!values.role) values.role = currentUser?.role;
    dispatch(
      updateUser({
        _id: currentUser._id,
        ...values,
      }),
    );
  };

  return (
    <Modal title="Cập nhật danh mục" visible={visible} onCancel={() => setVisible(false)} width={600} footer={null}>
      {currentUser && (
        <Form name="basic" onFinish={onFinish} initialValues={{ name: currentUser?.name }}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Tên',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role">
            <Select defaultValue={'' + currentUser?.role} style={{ width: '100%' }}>
              <Option value="0">Admin</Option>
              <Option value="1">Giáo viên</Option>
              <Option value="2">Học sinh</Option>
            </Select>
          </Form.Item>
          <div className="btn-group">
            <Button onClick={() => setVisible(false)} style={{ marginRight: 10 }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default UserFormModal;
