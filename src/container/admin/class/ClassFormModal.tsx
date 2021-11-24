import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClass, updateClass } from 'redux/class/actions';
import { getAllExams } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { getAllUsers } from 'redux/user/actions';
import { AssignmentProps, ClassProps, ExamProps, UserProps } from 'types/redux';

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
  const {
    user: { id },
  } = useSelector(({ auth }) => auth);
  const { users, loading: userLoading } = useSelector(({ user }) => user);
  const { exams, loading: examLoading } = useSelector(({ exam }) => exam);
  const { assignments, loading: assignmentLoading } = useSelector(({ assignment }) => assignment);
  const { loading } = useSelector((state) => state.class);

  const onFinish = (values: any) => {
    !selectedClass
      ? dispatch(createClass(values))
      : dispatch(updateClass({ ...values, updated_by: id, _id: selectedClass._id }));

    onClose();
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
              name: ['assignments'],
              value: currentClass?.assignments?.map((e: AssignmentProps) => e._id) ?? [],
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
              loading={assignmentLoading}
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

          <Form.Item name="assignments" label="Bài tập">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              loading={userLoading}
            >
              {assignments.map((e: AssignmentProps) => (
                <Option value={e?._id} key={e._id}>
                  {e.title}
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
