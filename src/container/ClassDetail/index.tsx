import './style.scss';

import { Avatar, Button, Card, Col, Empty, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import BackButton from 'components/BackButton';
import { isEqual } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { getClassById } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';
import { AssignmentProps } from 'types/redux';

const ClassDetail = () => {
  const { classId } = useParams<any>();
  const { url } = useRouteMatch<any>();
  const dispatch = useDispatch();

  const { loading, class: currentClass } = useSelector((state) => state.class);

  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    }
  }, [classId, dispatch]);

  return (
    <div>
      {!isEqual(currentClass, {}) && (
        <Row className="card-list" gutter={[0, 5]}>
          <Col xs={24}>
            <div className="home-recommendation">
              <h3>
                <BackButton link={'/home'} title="Các lớp" />
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
      )}
    </div>
  );
};

export default ClassDetail;
