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
  const [questionInfo, setQuestionInfo] = useState({ answers: [], category: {}, correctAnswer: {} });
  const { categories, loadingCategory } = useSelector((state) => state.category);

  const handleAddNewQuestion = () => {
    console.log(questionInfo);
    const { category, correctAnswer } = questionInfo;
    let tempQues: any = questionInfo;

    if (!category) {
      tempQues.category = categories[0]._id || null;
    }

    if (!correctAnswer) {
      tempQues.correctAnswer = answerList[0].value;
    }

    let x = Object.keys(tempQues).filter((e) => {
      return /\d/.test(e);
    });

    x.forEach((e, i) => {
      tempQues.answers = [...tempQues.answers, tempQues[`${i}`]];
      delete tempQues[`${i}`];
    });
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

  const onChange = (e: { target: { name: any; value: any } }) => {
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
              {categories.map(
                (
                  e: {
                    _id: Key;
                    name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                  },
                  i: string | number | undefined,
                ) => (
                  <Option value={e._id} key={i}>
                    {e.name}
                  </Option>
                ),
              )}
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
          <div className="modal-item__label">Đáp án </div>
          <div className="modal-item__main">
            {answerList.map((e, i) => (
              <div className="modal-item__answer" key={i}>
                <Input
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
