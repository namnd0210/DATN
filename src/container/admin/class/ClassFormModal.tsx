import { Button, Divider, Form, Input, Modal, PageHeader, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'redux/reducer';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ClassFormModal = ({ visible, setVisible }: any) => {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} không được để trống!',
  };
  /* eslint-enable no-template-curly-in-string */

  const dispatch = useDispatch();
  // const { users, loadingUser, students } = useSelector(({ auth }) => auth);
  // const { exams, loadingCourse } = useSelector(({ exam }) => exam);

  const onFinish = (values: any) => {
    // if (!values.teacher) values.teacher = users[0]._id || null;
    // dispatch(createClass(values));
  };

  useEffect(() => {
    // dispatch(getAllUsers({ role: 1 }));
    // dispatch(getAllExam());
    // dispatch(getAllStudent());
    // eslint-disable-next-line
  }, []);

  return (
    <Modal title="Thêm mới lớp học" visible={visible} onCancel={() => setVisible(false)} width={600} footer={null}>
      {/* <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Thêm lớp học"
        subTitle="Thêm lớp học mới"
      /> */}

      <div style={{ background: '#fff', padding: '40px 20px 20px 20px' }}>
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
          // initialValues={{
          //   teacher: users[0]?._id,
          // }}
        >
          <Form.Item name="name" label="Tên lớp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="teacher" label="Giáo viên">
            <Select
              style={{ width: '100%' }}
              // loading={loadingUser}
            >
              {/* {users.map((e) => (
                <Option value={e?._id} key={e._id}>
                  {e?.name}
                </Option>
              ))} */}
            </Select>
          </Form.Item>

          <Form.Item name="students" label="Học sinh">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // onChange={handleChange}
            >
              {/* {students.map((e) => (
                <Option key={e._id}>{e.name}</Option>
              ))} */}
            </Select>
          </Form.Item>

          <Form.Item name="exam" label="Bài thi trắc nghiệm">
            <Select
              style={{ width: '100%' }}
              // loading={loadingCourse}
            >
              {/* {exams.map((e) => (
                <Option value={e?._id} key={e._id}>
                  {e?.title}
                </Option>
              ))} */}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ClassFormModal;
