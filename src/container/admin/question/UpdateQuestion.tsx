import '../../../assets/styles/modal.scss';

import { Input, Modal, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateQuestion } from '../../../redux/actions/question';

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
export const UpdateQuestion = ({ visible, setVisible, id }) => {
  const dispatch = useDispatch();
  const { categories, loadingCategory } = useSelector((state) => state.category);
  const { questions } = useSelector((state) => state.question);

  const { loadingQuestions } = useSelector((state) => state.question);
  const [question, setQuestion] = useState();
  const [updateQues, setUpdateQues] = useState();

  const onChange = (e) => {
    console.log(e.target.name);
    if (/\d/.test(+e.target.name)) {
      let tempAnswers = [...updateQues.answers];
      tempAnswers[e.target.name] = e.target.value;
      setUpdateQues({ ...updateQues, answers: tempAnswers });
    } else {
      setUpdateQues({ ...updateQues, [e.target.name]: e.target.value });
    }
  };

  const onChangeCheckBox = (e) => {
    setUpdateQues({ ...updateQues, correctAnswer: e.target.value });
  };

  const handleAddNewQuestion = () => {
    let data = {
      ...updateQues,
      category: updateQues.category?._id || updateQues.category,
    };
    dispatch(updateQuestion(data));
  };

  const handleChangeCategory = (e) => {
    console.log(e);
    setUpdateQues({ ...updateQues, category: e });
  };

  useEffect(() => {
    setQuestion(questions.find((e) => e._id === '' + id));
    setUpdateQues(questions.find((e) => e._id === '' + id));
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
          loading={loadingQuestions}
        >
          <div className="modal-item">
            <div className="modal-item__label">Danh mục</div>
            <div className="modal-item__main">
              <Select
                defaultValue={question.category?._id}
                style={{ width: '100%' }}
                onChange={handleChangeCategory}
                loading={loadingCategory}
                name="category"
              >
                {categories.map((e, i) => (
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
                    name={i}
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
