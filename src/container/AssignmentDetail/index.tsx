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
import { getAssignmentResultByAssignmentId } from 'redux/assignment-result/actions';
import { getClassById } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';

const AssignmentDetail = () => {
  const dispatch = useDispatch();
  const { classId, assignmentId } = useParams<any>();

  const { isAdmin, isTeacher } = useSelector((state) => state.auth);
  const { loading: classLoading, class: currentClass } = useSelector((state) => state.class);
  const { loading: assignmentLoading, assignment: currentAssignment } = useSelector((state) => state.assignment);
  const { result: currentAssignmentResult } = useSelector((state) => state.assignmentResult);

  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    }
  }, [classId, dispatch]);

  useEffect(() => {
    if (assignmentId) {
      dispatch(getAssignmentById(assignmentId));
      !isAdmin && !isTeacher && dispatch(getAssignmentResultByAssignmentId(assignmentId));
    }
  }, [assignmentId, classId, dispatch, isAdmin, isTeacher]);

  const loading = classLoading || assignmentLoading;

  return (
    <Row>
      {!isEqual(currentClass, {}) && !isEqual(currentAssignment, {}) && (
        <Col span={18}>
          <div className="home-recommendation">
            <div className="slide-wrap">
              {loading && (
                <div style={{ padding: '1.5rem 0.5rem', background: '#fff' }}>
                  <Skeleton avatar active />
                </div>
              )}

              {!loading && (
                <Card
                  title={
                    <BackButton
                      link={isAdmin || isTeacher ? `/manage/class/${classId}` : `/my-class/${classId}`}
                      title={currentClass.name}
                    />
                  }
                  style={{ width: '100%', minHeight: '400px', marginTop: '1rem' }}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={
                      <div className="assignment-title-wrapper-01">
                        <div>
                          <div className="assignment-title">{currentAssignment.title}</div>

                          <div className="info">
                            {currentClass.teacher.name} • {moment(currentClass.updated_at).format('MMM DD yyyy')}
                          </div>

                          <div className="point">{currentAssignment.point ?? 'Chưa chấm'} điểm</div>
                        </div>

                        <div className="due-date">
                          Hạn nộp: {moment(currentAssignment.due_date).format('MMM DD yyyy, HH:mm')}
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

      {!isAdmin && !isTeacher && currentAssignmentResult && !isEqual(currentAssignmentResult, {}) && (
        <Col span={6}>
          <UploadFileForm id={currentAssignmentResult._id} currentFiles={currentAssignmentResult.files} />
        </Col>
      )}
    </Row>
  );
};

export default AssignmentDetail;
