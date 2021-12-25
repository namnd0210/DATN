import 'assets/styles/add-exam.scss';

import { Avatar, Button, Card, Col, Input, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import AssignmentResultFiles from 'components/AssignmentResultFiles';
import BackButton from 'components/BackButton';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getAssignmentResultById, updateAssignmentResult } from 'redux/assignment-result/actions';
import { useSelector } from 'redux/reducer';

const AssignmentResultDetail = () => {
  const dispatch = useDispatch();
  const { classId, assignmentId, assignmentResultId } = useParams<any>();
  const {
    result: {
      assignment,
      class: classData,
      files,
      created_by,
      //  comments,
      point,
    },
    loading,
  } = useSelector((state) => state.assignmentResult);

  const [grade, setGrade] = useState<any>(point);
  // const [comment, setComment] = useState<any>();

  const handleSubmit = useCallback(() => {
    const payload = {
      _id: assignmentResultId,
      // comments: [...comments, comment],
      point: grade,
    };

    dispatch(updateAssignmentResult(payload));
  }, [assignmentResultId, dispatch, grade]);

  useEffect(() => {
    if (assignmentResultId) {
      dispatch(getAssignmentResultById(assignmentResultId));
    }
  }, [assignmentResultId, dispatch]);

  return (
    <Row>
      {loading && (
        <div style={{ padding: '1.5rem 0.5rem', background: '#fff', width: '100%' }}>
          <Skeleton avatar active />
        </div>
      )}

      {!loading && (
        <>
          <Col span={18}>
            <div className="home-recommendation">
              <div className="slide-wrap">
                <Card
                  title={
                    <BackButton
                      link={`/my-class/${classId}/assignment/${assignmentId}`}
                      title={`Tên lớp: ${classData?.name}`}
                    />
                  }
                  style={{ width: '100%', minHeight: '400px', marginTop: '1rem' }}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={
                      <div className="assignment-title-wrapper-01">
                        <div>
                          <div className="assignment-title">{assignment?.title}</div>

                          <div className="info">Nộp bởi: {created_by?.name}</div>
                        </div>

                        <div className="due-date">
                          <div></div>
                          <div>Hạn nộp: {moment(assignment?.due_date).format('MMM DD yyyy, HH:mm')}</div>{' '}
                        </div>
                      </div>
                    }
                    description={<div className="assignment-des">{assignment?.description}</div>}
                  />
                </Card>
              </div>
            </div>
          </Col>

          <Col span={6}>
            <div className="admin-grade">
              <div>
                <Row>
                  <div className="add-exam-item__label">Bài tập đã nộp</div>
                </Row>

                <Row>
                  <AssignmentResultFiles currentFiles={files} assignmentId={assignmentId} userId={created_by?._id} />
                </Row>

                <div className="hr"></div>

                <Row style={{ alignItems: 'center' }}>
                  <Col span={12}>
                    <div className="add-exam-item__label">Chấm điểm</div>
                  </Col>

                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Input suffix="/100" placeholder="" value={grade} onChange={(e) => setGrade(e.target.value)} />
                  </Col>
                </Row>
              </div>

              <Row style={{ alignItems: 'center' }}>
                <Button type="primary" onClick={handleSubmit}>
                  Gửi
                </Button>
              </Row>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default AssignmentResultDetail;
