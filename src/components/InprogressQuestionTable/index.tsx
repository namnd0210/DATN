import './styles.scss';

import clsx from 'clsx';
import { Link } from 'react-scroll';

interface Question {
  _id: string;
  question: string;
  answers: string[];
}

const InprogressQuestionTable = ({
  handleSelectQuestion,
  focusIndex,
  list,
  answersList,
  isDone,
  doneList,
}: {
  handleSelectQuestion: any;
  focusIndex: number;
  list: Question[];
  answersList: string[];
  isDone?: boolean;
  doneList?: any[];
}) => {
  const missedQuestion = (index: number) => !answersList[index] && focusIndex > index;
  const checkedQuestion = (index: number) => answersList[index];
  const focusingQuestion = (index: number) => focusIndex === index;

  return (
    <div className="inprogress-question-table__wrapper">
      <div className="inprogress-question-table__list">
        {!isDone &&
          list.map((e, i) => (
            <Link key={e._id} to={e._id}>
              <div
                onClick={() => {
                  handleSelectQuestion(i);
                }}
                className={clsx(
                  'inprogress-question-table__item',
                  { 'inprogress-question-table__focus': focusingQuestion(i) },
                  { 'inprogress-question-table__miss': missedQuestion(i) },
                  { 'inprogress-question-table__check': checkedQuestion(i) },
                )}
              >
                {i + 1}
              </div>
            </Link>
          ))}

        {isDone &&
          doneList &&
          doneList.map((e: any, i: number) => (
            <Link key={i} to={e._id}>
              <div
                onClick={() => {
                  handleSelectQuestion(i);
                }}
                className={clsx(
                  'inprogress-question-table__item',
                  { 'inprogress-question-table__success': e.isTrue },
                  { 'inprogress-question-table__fail': !e.isTrue },
                )}
              >
                {i + 1}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default InprogressQuestionTable;
