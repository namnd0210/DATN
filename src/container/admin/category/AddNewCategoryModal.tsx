import './add-category.scss';

import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from 'redux/category/actions';

const AddNewCategoryModal = ({ visible, setVisible }: any) => {
  const dispatch = useDispatch();
  const formRef = useRef<any>();

  const onFinish = (values: any) => {
    dispatch(createCategory(values));
    formRef.current.resetFields();
    setVisible(false);
  };

  return (
    <Modal title="Thêm mới danh mục" visible={visible} onCancel={() => setVisible(false)} width={600} footer={null}>
      <Form ref={formRef} name="basic" onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng điền tên danh mục' }]}>
          <Input placeholder="Tên danh mục" />
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
    </Modal>
  );
};

export default AddNewCategoryModal;
