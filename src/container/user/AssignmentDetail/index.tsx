import './style.scss';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Slider from '@ant-design/react-slick';
import { Avatar, Button, Card, Col, Divider, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import assignment from 'assets/imgs/book-open.svg';
import course_1 from 'assets/imgs/course-1.png';
import course_2 from 'assets/imgs/course-2.png';
import course_3 from 'assets/imgs/course-3.png';
import course_4 from 'assets/imgs/course-4.png';
import heart from 'assets/imgs/heart.png';
import users from 'assets/imgs/users.svg';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { AssignmentProps, ClassProps } from 'types/redux';

const course_imgs = [course_1, course_2, course_3, course_4];

const AssignmentDetail = () => {
  const { classId, assignmentId } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(true);

  console.log({ classId, assignmentId });

  const {
    user: { classes },
  } = useSelector((state) => state.auth);

  const currentClass = classes.find((e: ClassProps) => e._id === classId);
  const currentAssignment = currentClass.assignments.find((a: AssignmentProps) => a._id === assignmentId);

  console.log(currentAssignment);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <Row>
        <Col span={24}>
          <div className="home-recommendation">
            <div className="slide-wrap">
              {loading && (
                <div style={{ padding: '1.5rem 0.5rem', background: '#fff' }}>
                  <Skeleton avatar active />
                </div>
              )}

              {!loading && (
                <Card
                  title={currentClass.name}
                  style={{ width: '100%', marginTop: '1rem' }}
                  extra={<EllipsisOutlined key="ellipsis" />}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={currentAssignment.title}
                    description={currentAssignment.description}
                  />
                </Card>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentDetail;
