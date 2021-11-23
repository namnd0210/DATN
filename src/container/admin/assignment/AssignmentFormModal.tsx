import '../../../assets/styles/add-exam.scss';

import { Button, Col, DatePicker, Input, message, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAssignment, updateAssignment } from 'redux/assignment/actions';
import { getAllQuestions } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';
import { AssignmentProps } from 'types/redux';

type Props = {
  onClose: () => void;
  selectedAssignment?: AssignmentProps;
};

export const AssignmentFormModal = ({ onClose, selectedAssignment }: Props) => {
  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState<any>({
    title: '',
    description: '',
  });

  const {
    user: { id },
  } = useSelector((state) => state.auth);

  const onChange = (e: any) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newAssignment: any = { ...assignment, created_by: id };
    if (newAssignment.title === '') {
      message.error('Không được để trống tiêu đề');
    } else if (newAssignment.description === '') {
      message.error('Không được để trống mô tả');
    } else {
      !selectedAssignment
        ? dispatch(createAssignment(newAssignment))
        : dispatch(updateAssignment({ ...newAssignment, _id: selectedAssignment._id }));
    }
  };

  const onOk = (value: any) => {
    setAssignment({
      ...assignment,
      due_date: value,
    });
  };

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedAssignment) {
      setAssignment(selectedAssignment);
      // setSelectedAssignment(selectedAssignment.questions.map((e) => e._id));
    }
  }, [selectedAssignment]);

  return (
    <Modal
      visible
      title={!selectedAssignment ? 'Thêm bài tập' : 'Cập nhật bài tập'}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <Row gutter={16} style={{ background: '#fff', margin: '1rem 0' }}>
        <Col xl={24}>
          <div className="add-exam-item">
            <div className="add-exam-item__label">Tên bài tập</div>
            <div className="add-exam-item__main">
              <Input value={assignment.title} placeholder="Tiêu đề bài tập" name="title" onChange={onChange} />
            </div>
          </div>

          <div className="add-exam-item">
            <div className="add-exam-item__label">Mô tả</div>
            <div className="add-exam-item__main">
              <TextArea
                value={assignment.description}
                placeholder="Mô tả bài tập"
                autoSize
                name="description"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-exam-item">
            <div className="add-exam-item__label">Hạn nộp</div>
            <div className="add-exam-item__main">
              <DatePicker showTime onOk={onOk} />
            </div>
          </div>

          <div className="btn-add-exam">
            <Button type="primary" onClick={handleSubmit}>
              {!selectedAssignment ? 'Thêm mới' : 'Cập nhật'}
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
