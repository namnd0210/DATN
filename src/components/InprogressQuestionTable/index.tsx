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
}: {
  handleSelectQuestion: any;
  focusIndex: number;
  list: Question[];
  answersList: string[];
}) => {
  const missedQuestion = (index: number) => !answersList[index] && focusIndex > index;
  const checkedQuestion = (index: number) => answersList[index];
  const focusingQuestion = (index: number) => focusIndex === index;

  return (
    <div className="inprogress-question-table__wrapper">
      <div className="inprogress-question-table__list">
        {list.map((e, i) => (
          <Link to={e._id}>
            <div
              onClick={() => {
                handleSelectQuestion(i);
              }}
              key={e._id}
              className={clsx(
                'inprogress-question-table__item',
                { 'inprogress-question-table__focus': focusingQuestion(i) },
                { 'inprogress-question-table__miss': missedQuestion(i) },
                { 'inprogress-question-table__check': checkedQuestion(i) },
                { 'inprogress-question-table__success': false },
                { 'inprogress-question-table__fail': false },
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
