import '../../../assets/styles/add-exam.scss';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, message, Modal, PageHeader, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExam, updateExam } from 'redux/exam/actions';
import { getAllQuestions } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';
import { ExamProps, QuestionProps } from 'types/redux';

import { AddNewQuestion } from '../question/AddNewQuestion';

type Props = {
  onClose: () => void;
  selectedExam?: ExamProps;
};

export const ExamFormModal = ({ onClose, selectedExam }: Props) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState<any>([]);
  const [exam, setExam] = useState<any>({});
  const { questions, loadingQuestion } = useSelector((state) => state.question);

  const {
    user: { id },
  } = useSelector((state) => state.auth);

  const filteredOptions = questions.filter((o: any) => !selectedAnswer.includes(o));

  const handleChange = (e: any) => {
    setSelectedAnswer(e);
  };

  const onChange = (e: any) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newExam: any = { ...exam, questions: selectedAnswer, created_by: id };
    if (newExam.title === '') {
      message.error('Không được để trống tên bộ câu hỏi');
    } else if (newExam.questions.length === 0) {
      message.error('Vui lòng chọn câu hỏi !');
    } else {
      !selectedExam ? dispatch(createExam(newExam)) : dispatch(updateExam(newExam));
    }
  };

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedExam) {
      setExam(selectedExam);
      setSelectedAnswer(selectedExam.questions.map((e) => e._id));
    }
  }, [selectedExam]);

  return (
    <Modal visible title="Thêm mới lớp học" onCancel={onClose} width={600} footer={null}>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Thêm bài thi trắc nghiệm"
        subTitle="Thêm bài thi trắc nghiệm mới"
      />
      <Row gutter={16} style={{ background: '#fff', margin: '1rem 0' }}>
        <Col xl={24}>
          <div className="add-exam-item">
            <div className="add-exam-item__label">Tên bài trắc nghiệm</div>
            <div className="add-exam-item__main">
              <TextArea
                value={exam.title}
                placeholder="Bài trắc nghiệm thứ nhất !"
                autoSize
                name="title"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-exam-item">
            <div className="add-exam-item__label">Mô tả</div>
            <div className="add-exam-item__main">
              <TextArea
                value={exam.description}
                placeholder="Bài trắc nghiệm về ..."
                autoSize
                name="description"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-exam-item">
            <div className="add-exam-item__label">Thời gian</div>
            <div className="add-exam-item__main">
              <Input
                value={exam.time}
                placeholder="Nhập thời gian để hoàn thành bài trắc nghiệm (phút)"
                type="number"
                name="time"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="add-exam-item">
            <div className="add-exam-item__label">Danh sách câu hỏi</div>
            <div className="add-exam-item__main">
              <Select
                loading={loadingQuestion}
                mode="multiple"
                placeholder="Chọn danh sách câu hỏi"
                value={selectedAnswer}
                onChange={handleChange}
                style={{ width: '100%' }}
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <Button style={{ margin: '4px' }}>
                      <PlusOutlined /> Thêm câu hỏi mới
                    </Button>
                  </div>
                )}
              >
                {filteredOptions.map((e: QuestionProps) => (
                  <Select.Option key={e._id} value={e._id}>
                    {e.question}
                  </Select.Option>
                ))}
              </Select>

              {/* <AddNewQuestion visible={visible} setVisible={setVisible} /> */}
            </div>
          </div>

          <div className="btn-add-exam">
            <Button type="primary" onClick={handleSubmit}>
              {!selectedExam ? 'Thêm mới' : 'Cập nhật'}
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
