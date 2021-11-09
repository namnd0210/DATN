import { Button, Divider, Radio, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExamById } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { createResult } from 'redux/result/actions';

import { CourseSkeleton } from '../CourseSkeleton';
import { HeaderCourse } from '../HeaderCourse';
import { ResultModal } from '../ResultModal';

const { TabPane } = Tabs;

export const TakeExam = () => {
  const [start, setStart] = useState(false);
  const [isDone, setDone] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [resultData, setResult] = useState([]);
  const [answersList, setAnswersList] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { exam } = useSelector(({ exam }) => exam);
  const { id } = useParams<{ id: string }>();

  const done = useCallback(
    (exam, answersList) => {
      let tempResults: any = [];
      let data: any = {};
      let trueAnswer = 0;

      exam.questions.forEach((e: any, i: number) => {
        let item = {
          isTrue: false,
          questionId: e._id,
          answer: answersList[i],
        };
        if (e.answers[e.correctAnswer] === answersList[i]) {
          item.isTrue = true;
          trueAnswer++;
        }
        tempResults = [...tempResults, item];
      });

      data.exam = exam._id;
      data.user = user.id;
      data.result = `${trueAnswer}/${tempResults.length}`;
      setResult(data);
      dispatch(createResult(data));
      setVisible(true);
    },
    [dispatch, user.id],
  );

  const onChange = (e: any) => {
    const value = e.target.value;
    let tempAns: any[] = [...answersList];
    tempAns[currentQuestion] = value;
    localStorage.setItem('answersList', JSON.stringify(tempAns));
    setAnswersList(tempAns);
  };

  const changeQuestion = (e: any) => {
    let index = 0;
    index = exam.questions.findIndex((k: { _id: any }) => k._id === e);
    setCurrentQuestion(index);
  };

  useEffect(() => {
    dispatch(getExamById(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let answer = JSON.parse(localStorage.getItem('answersList') ?? '[]');
    answer && setAnswersList(answer);
  }, []);

  return (
    <div style={{ background: '#fff', margin: '1rem 0', padding: '1rem' }}>
      <HeaderCourse start={start} setStart={setStart} done={done} isDone={isDone} />

      {!start ? (
        <CourseSkeleton />
      ) : (
        <div style={{ background: '#fff' }}>
          <Divider dashed />
          <Tabs
            defaultActiveKey="1"
            tabPosition={'left'}
            style={{ height: 'calc(100vh - 400px)' }}
            onChange={changeQuestion}
          >
            {exam?.questions?.map(
              (
                e: {
                  _id: string;
                  question: string;
                  answers: any[];
                },
                i: number,
              ) => (
                <TabPane tab={`Câu hỏi thứ ${i + 1}`} key={e._id}>
                  <div>
                    <h3>{e.question}</h3>
                    <Radio.Group onChange={onChange} value={JSON.parse(localStorage.getItem('answersList') ?? '[]')[i]}>
                      {e.answers.map((e: string, k: number) => (
                        <Radio value={e} key={k}>
                          {e}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </TabPane>
              ),
            )}
          </Tabs>
          <Button
            type="primary"
            onClick={() => {
              setDone(true);
              done(exam, answersList);
              localStorage.removeItem('answersList');
              localStorage.removeItem('time');
            }}
          >
            Hoàn thành
          </Button>
          <ResultModal visible={visible} resultsdata={resultData} exam={exam} />
        </div>
      )}
    </div>
  );
};
