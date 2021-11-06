import { Button, Divider, Form, Input, Modal, PageHeader, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClass } from 'redux/class/actions';
import { getAllExams } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { getAllUsers } from 'redux/user/actions';
import { ClassProps, ExamProps, UserProps } from 'types/redux';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ClassFormModal = ({ onClose, selectedClass }: any) => {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} không được để trống!',
  };

  const [currentClass, setCurrentClass] = useState<ClassProps>();
  const dispatch = useDispatch();
  const { users, loading: userLoading } = useSelector(({ user }) => user);
  const { exams, loading: examLoading } = useSelector(({ exam }) => exam);
  const { loading } = useSelector((state) => state.class);

  const onFinish = (values: any) => {
    console.log(values);
    // if (!values.teacher) values.teacher = users[0]._id || null;
    dispatch(createClass(values));
  };

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllExams());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setCurrentClass(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    console.log(currentClass);
  }, [currentClass]);

  return (
    <Modal title="Thêm mới lớp học" visible onCancel={onClose} width={600} footer={null}>
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
          fields={[
            {
              name: ['name'],
              value: currentClass?.name ?? '',
            },
            {
              name: ['teacher'],
              value: currentClass?.teacher._id ?? users.filter((e: UserProps) => e.role === 1)[0]?._id,
            },
            {
              name: ['students'],
              value: currentClass?.students?.map((e: UserProps) => e._id) ?? [],
            },
            {
              name: ['exam'],
              value: currentClass?.exam._id,
            },
          ]}
        >
          <Form.Item name="name" label="Tên lớp" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="teacher" label="Giáo viên">
            <Select style={{ width: '100%' }} loading={userLoading}>
              {users
                .filter((e: UserProps) => e.role === 1)
                .map((e: UserProps) => (
                  <Option value={e?._id} key={e._id}>
                    {e.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="students" label="Học sinh">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              loading={userLoading}
              // onChange={handleChange}
            >
              {users
                .filter((e: UserProps) => e.role === 2)
                .map((e: UserProps) => (
                  <Option value={e?._id} key={e._id}>
                    {e.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="exam" label="Bài thi trắc nghiệm">
            <Select style={{ width: '100%' }} loading={examLoading}>
              {exams.map((e: ExamProps) => (
                <Option value={e?._id} key={e._id}>
                  {e?.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ClassFormModal;
