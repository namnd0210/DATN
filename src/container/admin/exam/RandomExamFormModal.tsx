import '../../../assets/styles/add-exam.scss';

import { Button, Col, Input, message, Modal, PageHeader, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Key } from 'rc-select/lib/interface/generator';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRandomExam } from 'redux/exam/actions';
import { getAllQuestions } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';

const { Option } = Select;

type Props = {
  onClose: () => void;
};

const initValue = {
  time: 0,
  title: '',
  description: '',
  category: undefined,
  level2Numbers: 0,
  level3Numbers: 0,
  total: 0,
};

export const RandomExamFormModal = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const [exam, setExam] = useState<any>(initValue);
  const { categories, loadingCategory } = useSelector((state) => state.category);

  const {
    user: { id },
  } = useSelector((state) => state.auth);

  const onChange = (e: any) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newExam: any = { ...exam, created_by: id, category: exam.category ?? categories[0]._id };
    if (newExam.title === '') {
      message.error('Không được để trống tên bộ câu hỏi');
    } else {
      dispatch(createRandomExam(newExam));
    }
  };

  const handleChangeCategory = useCallback(
    (e: any) => {
      setExam({ ...exam, category: e });
    },
    [exam],
  );

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  return (
    <Modal visible title="Thêm mới ngẫu nhiên bài thi" onCancel={onClose} width={600} footer={null}>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Thêm bài thi trắc nghiệm"
        subTitle="Thêm bài thi trắc nghiệm mới"
      />
      <Row gutter={16} style={{ background: '#fff', margin: '1rem 0' }}>
        <Col xs={24}>
          <div className="add-exam-item">
            <div className="add-exam-item__label">Tên bài trắc nghiệm</div>
            <div className="add-exam-item__main">
              <TextArea
                value={exam.title}
                placeholder="Tên bài thi trắc nghiệm"
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

          <Row>
            <Col span={8} style={{ paddingRight: 8 }}>
              <div className="add-exam-item">
                <div className="add-exam-item__label">Loại câu hỏi</div>
                <div className="modal-item__main">
                  {categories.length > 0 && (
                    <Select
                      value={exam.category ?? categories[0]._id}
                      onChange={handleChangeCategory}
                      loading={loadingCategory}
                    >
                      {categories.map((e: { _id: Key; name: string }, i: number) => (
                        <Option value={e._id} key={i}>
                          {e.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={8} style={{ paddingRight: 8 }}>
              <div className="add-exam-item">
                <div className="add-exam-item__label">Tổng câu hỏi</div>
                <div className="add-exam-item__main">
                  <Input value={exam.total} placeholder="Tổng" type="number" name="total" onChange={onChange} />
                </div>
              </div>
            </Col>

            <Col span={8} style={{ paddingRight: 8 }}>
              <div className="add-exam-item">
                <div className="add-exam-item__label">Câu hỏi trung bình</div>
                <div className="add-exam-item__main">
                  <Input
                    value={exam.level2Numbers}
                    placeholder="Số câu trung bình"
                    type="number"
                    name="level2Numbers"
                    onChange={onChange}
                  />
                </div>
              </div>
            </Col>

            <Col span={8}>
              <div className="add-exam-item">
                <div className="add-exam-item__label">Câu hỏi khó</div>
                <div className="add-exam-item__main">
                  <Input
                    value={exam.level3Numbers}
                    placeholder="Số câu khó"
                    type="number"
                    name="level3Numbers"
                    onChange={onChange}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <div className="btn-add-exam">
            <Button type="primary" onClick={handleSubmit}>
              Tạo ngẫu nhiên
            </Button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
