import './style.scss';

import { Button, Divider, Radio } from 'antd';
import clsx from 'clsx';
import InprogressQuestionTable from 'components/InprogressQuestionTable';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Element } from 'react-scroll';
import { getExamById } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { createResult } from 'redux/result/actions';

import { CourseSkeleton } from '../CourseSkeleton';
import { HeaderCourse } from '../HeaderCourse';
import { ResultModal } from '../ResultModal';

export const TakeExam = () => {
  const [start, setStart] = useState(false);
  const [isDone, setDone] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [resultData, setResult] = useState([]);
  const [answersList, setAnswersList] = useState<any[]>([]);
  const [doneList, setDoneList] = useState<any[]>([]);
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
        let item: any = {
          ...e,
          isTrue: false,
          questionId: e._id,
          answer: answersList[i],
          correctAnswer: e.answers[e.correctAnswer],
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
      setDoneList(tempResults);
      setVisible(true);
    },
    [dispatch, user.id],
  );

  const onChange = (e: any, id: string) => {
    const index = exam.questions.findIndex((k: { _id: any }) => k._id === id) ?? 0;

    const value = e.target.value;
    let tempAns: any[] = [...answersList];
    tempAns[index] = value;
    localStorage.setItem('answersList', JSON.stringify(tempAns));
    setAnswersList(tempAns);
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

  const listQuestion = !isDone ? exam.questions : doneList;

  return (
    <div style={{ background: '#fff', margin: '1rem 0', padding: '1rem' }}>
      <HeaderCourse start={start} setStart={setStart} done={done} isDone={isDone} />

      {!start ? (
        <CourseSkeleton />
      ) : (
        <div style={{ background: '#fff' }} className="take-exam__list">
          <Divider dashed />

          {listQuestion.length > 0 &&
            listQuestion?.map(
              (
                e: {
                  _id: string;
                  question: string;
                  answers: any[];
                  correctAnswer?: string;
                  answer?: string;
                },
                i: number,
              ) => (
                <Element key={e._id} name={e._id}>
                  <div id={e._id} className="take-exam__item">
                    <h3>
                      {`${i + 1}. `}
                      {e.question}
                    </h3>
                    <Radio.Group
                      onChange={(event) => !isDone && onChange(event, e._id)}
                      value={JSON.parse(localStorage.getItem('answersList') ?? '[]')[i]}
                    >
                      {e.answers.map((a: string, k: number) => (
                        <Radio
                          value={a}
                          key={k}
                          className={clsx(
                            { 'take-exam__success': e.correctAnswer === a },
                            { 'take-exam__fail': e.correctAnswer !== e.answer && e.answer === a },
                          )}
                        >
                          {a}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </Element>
              ),
            )}
          <Button
            type="primary"
            disabled={isDone}
            onClick={() => {
              setDone(true);
              done(exam, answersList);
            }}
          >
            Hoàn thành
          </Button>
          <ResultModal
            visible={visible}
            resultsdata={resultData}
            exam={exam}
            onCancel={() => setVisible(false)}
            onOk={() => {
              localStorage.removeItem('time');
              localStorage.removeItem('answersList');
            }}
          />
        </div>
      )}

      {start && exam?.questions && (
        <InprogressQuestionTable
          handleSelectQuestion={setCurrentQuestion}
          focusIndex={currentQuestion}
          answersList={answersList}
          list={exam?.questions}
          isDone={isDone}
          doneList={doneList}
        />
      )}
    </div>
  );
};
