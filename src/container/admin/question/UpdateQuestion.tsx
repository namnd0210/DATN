import 'assets/styles/modal.scss';

import { Input, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuestion } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';

const { Option } = Select;
const { TextArea } = Input;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const answerList = [
  {
    name: 'A',
    placeholder: 'Đáp án A',
    value: 0,
  },
  {
    name: 'B',
    placeholder: 'Đáp án B',
    value: 1,
  },
  {
    name: 'C',
    placeholder: 'Đáp án C',
    value: 2,
  },
  {
    name: 'D',
    placeholder: 'Đáp án D',
    value: 3,
  },
];
export const UpdateQuestion = ({ visible, setVisible, id }: any) => {
  const dispatch = useDispatch();
  const { categories, loadingCategory } = useSelector((state) => state.category);
  const { questions } = useSelector((state) => state.question);

  const { loadingQuestion } = useSelector((state) => state.question);
  const [question, setQuestion] = useState<any>();
  const [updateQues, setUpdateQues] = useState<any>();

  const onChange = (e: any) => {
    console.log(e.target.name);
    if (/\d/.test(e.target.name)) {
      let tempAnswers = [...updateQues.answers];
      tempAnswers[e.target.name] = e.target.value;
      setUpdateQues({ ...updateQues, answers: tempAnswers });
    } else {
      setUpdateQues({ ...updateQues, [e.target.name]: e.target.value });
    }
  };

  const onChangeCheckBox = (e: any) => {
    setUpdateQues({ ...updateQues, correctAnswer: e.target.value });
  };

  const handleAddNewQuestion = () => {
    let data = {
      ...updateQues,
      category: updateQues.category?._id || updateQues.category,
    };
    dispatch(updateQuestion(data));
  };

  const handleChangeCategory = (e: any) => {
    console.log(e);
    setUpdateQues({ ...updateQues, category: e });
  };

  useEffect(() => {
    setQuestion(questions.find((e: { _id: string }) => e._id === '' + id));
    setUpdateQues(questions.find((e: { _id: string }) => e._id === '' + id));
  }, [visible, questions, id]);

  return (
    <div>
      {question && (
        <Modal
          title="Cập nhật câu hỏi"
          visible={visible}
          onOk={() => {
            handleAddNewQuestion();
            setQuestion(null);
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
            setQuestion(null);
            setVisible(false);
          }}
          width={600}
        >
          <div className="modal-item">
            <div className="modal-item__label">Danh mục</div>
            <div className="modal-item__main">
              <Select
                defaultValue={question.category?._id}
                style={{ width: '100%' }}
                onChange={handleChangeCategory}
                loading={loadingCategory}
              >
                {categories.map((e: any, i: number) => (
                  <Option value={e._id} key={i}>
                    {e.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="modal-item">
            <div className="modal-item__label">Tiêu đề</div>
            <div className="modal-item__main">
              <TextArea
                placeholder="What is your question ?"
                autoSize
                name="question"
                defaultValue={question.question}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="modal-item">
            <div className="modal-item__label">Đáp án </div>
            <div className="modal-item__main">
              {answerList.map((e, i) => (
                <div className="modal-item__answer" key={i}>
                  <Input
                    size="large"
                    placeholder={e.placeholder}
                    prefix={`${e.name}-`}
                    className="modal-item__input"
                    name={`answer-${i}`}
                    onChange={onChange}
                    defaultValue={question.answers[i]}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-item">
            <div className="modal-item__label">Đáp án đúng </div>
            <div className="modal-item__main">
              <Radio.Group onChange={onChangeCheckBox} defaultValue={answerList[question.correctAnswer].value}>
                {answerList.map((e, i) => (
                  <Radio style={radioStyle} value={e.value} key={i}>
                    {e.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
