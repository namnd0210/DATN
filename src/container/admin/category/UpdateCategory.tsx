import './add-category.scss';

import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from 'redux/category/actions';
import { useSelector } from 'redux/reducer';

export const UpdateCategory = ({ setVisible, visible, id }: any) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(({ category }) => category.categories.find((e: any) => e._id === id));

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(
      updateCategory({
        _id: id,
        ...values,
      }),
    );
  };

  return (
    <Modal title="Cập nhật danh mục" visible={visible} onCancel={() => setVisible(false)} width={600} footer={null}>
      {' '}
      {currentCategory && (
        <Form key={id} name="basic" onFinish={onFinish} initialValues={{ name: currentCategory?.name }}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên danh mục câu hỏi',
              },
            ]}
          >
            <Input />
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
