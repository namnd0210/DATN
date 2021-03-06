import './style.scss';

import { Avatar, Card, Col, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import BackButton from 'components/BackButton';
import UploadFileForm from 'components/UploadFileForm';
import { isEqual } from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from 'redux/assignment/actions';
import { getClassById } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';

import AssignmentResultList from './../../components/AssignmentResultList/index';

const AssignmentDetail = () => {
  const dispatch = useDispatch();
  const { classId, assignmentId } = useParams<any>();

  const {
    isAdmin,
    isTeacher,
    user: { id: userId },
  } = useSelector((state) => state.auth);
  const { loading: classLoading, class: currentClass } = useSelector((state) => state.class);
  const { loading: assignmentLoading, assignment: currentAssignment } = useSelector((state) => state.assignment);
  const { result: currentAssignmentResult } = useSelector((state) => state.assignmentResult);

  const isStudent = !isAdmin && !isTeacher;

  useEffect(() => {
    if (classId && isEqual(currentClass, {})) {
      dispatch(getClassById(classId));
    }
  }, [classId, currentClass, dispatch]);

  console.log(currentAssignment);

  useEffect(() => {
    if (assignmentId) {
      dispatch(getAssignmentById(assignmentId));
    }
  }, [assignmentId, classId, dispatch, isAdmin, isStudent, isTeacher, userId]);

  const loading = classLoading || assignmentLoading;

  return (
    <>
      <Row>
        {!isEqual(currentClass, {}) && !isEqual(currentAssignment, {}) && (
          <Col span={isStudent ? 18 : 24}>
            <div className="home-recommendation">
              <div className="slide-wrap">
                {loading && (
                  <div style={{ padding: '1.5rem 0.5rem', background: '#fff' }}>
                    <Skeleton avatar active />
                  </div>
                )}

                {!loading && (
                  <Card
                    title={<BackButton link={`/my-class/${classId}`} title={`T??n l???p: ${currentClass.name}`} />}
                    style={{ width: '100%', minHeight: '400px', marginTop: '1rem' }}
                  >
                    <Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={
                        <div className="assignment-title-wrapper-01">
                          <div>
                            <div className="assignment-title">{currentAssignment.title}</div>

                            <div className="info">
                              {currentClass.teacher.name} ??? {moment(currentClass.updated_at).format('MMM DD yyyy')}
                            </div>

                            {!isAdmin && !isTeacher && (
                              <div className="point">{currentAssignmentResult?.point ?? 'Ch??a ch???m'} ??i???m</div>
                            )}
                          </div>

                          <div className="due-date">
                            <div>
                              {currentAssignment.assignmentResults.length}/{currentClass.students.length}
                            </div>
                            <div>H???n n???p: {moment(currentAssignment.due_date).format('MMM DD yyyy, HH:mm')}</div>{' '}
                          </div>
                        </div>
                      }
                      description={<div className="assignment-des">{currentAssignment.description}</div>}
                    />
                  </Card>
                )}
              </div>
            </div>
          </Col>
        )}

        {isStudent && (
          <Col span={6}>
            <UploadFileForm />
          </Col>
        )}
      </Row>

      {!isStudent && (
        <div>
          <h2>Danh s??ch sinh vi??n n???p b??i t???p</h2>

          <AssignmentResultList list={currentAssignment.assignmentResults} loading={assignmentLoading} />
        </div>
      )}
    </>
  );
};

export default AssignmentDetail;
