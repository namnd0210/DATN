import './assignment.scss';

import { Col, Divider, Row } from 'antd';
import bookmark from 'assets/imgs/bookmark.svg';
import more_vertical from 'assets/imgs/more-vertical.svg';
import React from 'react';

type AssignmentData = {
  id: string;
  title: string;
  due_date: Number;
};

const data: AssignmentData[] = [
  {
    id: '123',
    title: 'Bai tap lon',
    due_date: Date.now(),
  },
];

const AssignmentManagement = () => {
  return (
    <div>
      <Row>
        <Col className="divider" span={8}>
          <Divider orientation="left" plain>
            Bài tập đến hạn
          </Divider>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
            sunt a te dicta? Refert tamen, quo modo.
          </p>
        </Col>

        <Col span={16}>
          {data.map((e) => (
            <div className="assignment-wrapper">
              <img width={40} height={40} src={bookmark} onError={() => null} alt="bookmark" />

              <div className="assignment-title-wrapper">
                <div>{e.title}</div>

                <img src={more_vertical} onError={() => null} alt="more option" />
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentManagement;
