import './style.scss';

import { Avatar, Button, Card, Col, Empty, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import BackButton from 'components/BackButton';
import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { AssignmentProps, ClassProps } from 'types/redux';

const ClassDetail = () => {
  const { classId } = useParams<any>();
  const { url } = useRouteMatch<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    user: { classes },
  } = useSelector((state) => state.auth);

  const currentClass: ClassProps = classes.find((e: ClassProps) => e._id === classId);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Row className="card-list" gutter={[0, 5]}>
        <Col xl={24}>
          <div className="home-recommendation">
            <h3>
              <BackButton link="/my-class" title="Các lớp" />
            </h3>
            <h3>Môn học: {currentClass.name}</h3>
            <div>Số lượng sinh viên: {currentClass.students.length}</div>
            <div>Giảng viên: {currentClass.teacher.name}</div>
            <div>Số lượng bài tập: {currentClass.assignments.length}</div>

            <div className="slide-wrap">
              {currentClass.assignments.length === 0 && <Empty />}

              {currentClass.assignments.length > 0 &&
                currentClass.assignments.map((e: AssignmentProps, i: number) => (
                  <div key={i}>
                    {loading && (
                      <div style={{ marginTop: '1rem', padding: '1.5rem 0.5rem', background: '#fff' }}>
                        <Skeleton avatar active />
                      </div>
                    )}

                    {!loading && (
                      <Card style={{ width: '100%', marginTop: '1rem' }}>
                        <Meta
                          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                          title={e.title}
                          description={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                              <div className="pre-assignment-des">{e.description}</div>

                              <Button type="primary">
                                <Link to={`${url}/assignment/${e._id}`}>Chi tiết</Link>
                              </Button>
                            </div>
                          }
                        />
                      </Card>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ClassDetail;
