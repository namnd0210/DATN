import './style.scss';

import { Col, Divider, Row } from 'antd';
import bookmark from 'assets/imgs/bookmark.svg';
import more_vertical from 'assets/imgs/more-vertical.svg';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllAssignmentById } from 'redux/assignment/actions';

type AssignmentData = {
  id: string;
  title: string;
  due_date: string;
};

const data: AssignmentData[] = [
  {
    id: '123',
    title: 'Bai tap lon',
    due_date: '20/10/2021',
  },
];

const AssignmentList = () => {
  const dispatch = useDispatch();
  const { assignmentId } = useParams<any>();
  console.log(assignmentId);

  useEffect(() => {
    dispatch(getAllAssignmentById(assignmentId));
  }, [dispatch, assignmentId]);

  return (
    <div style={{ padding: 12 }}>
      <Row>
        <Col className="divider" span={8}>
          <div className="coming-up">
            <Divider orientation="left" plain>
              Bài tập đến hạn
            </Divider>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
              quae sunt a te dicta? Refert tamen, quo modo.
            </p>
          </div>
        </Col>

        <Col span={16}>
          <div className="list-assignment">
            {data.map((e) => (
              <div className="assignment-wrapper">
                <img width={40} height={40} src={bookmark} onError={() => null} alt="bookmark" />

                <div className="assignment-title-wrapper">
                  <div className="date-title">
                    <div>{e.title}</div>

                    <div>{moment(e.due_date, 'DD/MM/yyyy').format('DD/MM/yyyy HH:mm')}</div>
                  </div>

                  <img src={more_vertical} onError={() => null} alt="more option" />
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentList;
