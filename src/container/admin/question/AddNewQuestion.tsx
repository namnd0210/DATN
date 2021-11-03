import 'assets/styles/modal.scss';

import { Input, message, Modal, Radio, Select } from 'antd';
import { Key } from 'rc-select/lib/interface/generator';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategory } from 'redux/category/actions';
import { createQuestion } from 'redux/question/actions';
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

export const AddNewQuestion = ({ visible, setVisible }: any) => {
  const dispatch = useDispatch();
  const [questionInfo, setQuestionInfo] = useState({
    A: '',
    B: '',
    C: '',
    D: '',
    category: undefined,
    correctAnswer: {},
    question: '',
  });
  const { categories, loadingCategory } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const handleAddNewQuestion = () => {
    let tempQues: any = {
      answers: [],
    };

    questionInfo.A && tempQues.answers.push(questionInfo.A);
    questionInfo.B && tempQues.answers.push(questionInfo.B);
    questionInfo.C && tempQues.answers.push(questionInfo.C);
    questionInfo.D && tempQues.answers.push(questionInfo.D);
    tempQues.question = questionInfo.question;
    tempQues.correctAnswer = questionInfo.correctAnswer ?? answerList[0].value;
    tempQues.category = questionInfo.category ?? categories[0]._id;
    tempQues.created_by = user.id;

    console.log(tempQues);
    if (tempQues.answers.length < 4 || tempQues.question === '' || !tempQues.question) {
      message.error('Field is not empty!!');
    } else {
      dispatch(createQuestion(tempQues));
      // setQuestionInfo({ answers: [] });
    }
  };

  const handleChangeCategory = (e: any) => {
    setQuestionInfo({ ...questionInfo, category: e });
  };

  const onChangeCheckBox = (e: any) => {
    setQuestionInfo({ ...questionInfo, correctAnswer: e.target.value });
  };

  const onChange = (e: any) => {
    setQuestionInfo({ ...questionInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getAllCategory());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Modal
        title="Thêm mới câu hỏi"
        visible={visible}
        onOk={() => handleAddNewQuestion()}
        onCancel={() => setVisible(false)}
        width={600}
      >
        <div className="modal-item">
          <div className="modal-item__label">Danh mục</div>
          <div className="modal-item__main">
            <Select
              defaultValue={categories[0] && categories[0]._id}
              style={{ width: '100%' }}
              onChange={handleChangeCategory}
              loading={loadingCategory}
            >
              {categories.map((e: { _id: Key; name: string }, i: number) => (
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
            <TextArea placeholder="Nhập tiêu đề câu hỏi của bạn" autoSize name="question" onChange={onChange} />
          </div>
        </div>

        <div className="modal-item">
          <div className="modal-item__label">Đáp án</div>
          <div className="modal-item__main">
            {answerList.map((e, i) => (
              <div className="modal-item__answer" key={i}>
                <Input
                  name={e.name}
                  size="large"
                  placeholder={e.placeholder}
                  prefix={`${e.name}-`}
                  className="modal-item__input"
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="modal-item">
          <div className="modal-item__label">Đáp án đúng </div>
          <div className="modal-item__main">
            <Radio.Group onChange={onChangeCheckBox} defaultValue={answerList[0].name}>
              {answerList.map((e, i) => (
                <Radio style={radioStyle} value={e.value} key={i}>
                  {e.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
};
