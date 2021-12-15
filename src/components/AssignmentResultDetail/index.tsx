import { Button, Col, Input, Row } from 'antd';
import AssignmentResultFiles from 'components/AssignmentResultFiles';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getAssignmentResultById, updateAssignmentResult } from 'redux/assignment-result/actions';
import { useSelector } from 'redux/reducer';

const AssignmentResultDetail = () => {
  const dispatch = useDispatch();
  const { assignmentId, assignmentResultId } = useParams<any>();
  const {
    result: {
      assignment,
      class: classData,
      files,
      created_by,
      comments,
      created_by: { _id: studentId },
    },
    result,
  } = useSelector((state) => state.assignmentResult);

  const [grade, setGrade] = useState<any>();
  const [comment, setComment] = useState<any>();

  console.log({ result, assignment, classData, files, comments });

  const handleSubmit = useCallback(() => {
    const payload = {
      _id: assignmentResultId,
      comments: [...comments, comment],
      point: grade,
    };

    dispatch(updateAssignmentResult(payload));
  }, [assignmentResultId, comment, comments, dispatch, grade]);

  useEffect(() => {
    if (assignmentResultId) {
      dispatch(getAssignmentResultById(assignmentResultId));
    }
  }, [assignmentResultId, dispatch]);

  // tạo giao diện comment và chấm điểm
  return (
    <Row>
      <Col span={15}>
        <div>Lớp: {classData?.name}</div>
        <div>Đề bài tập: {assignment?.title}</div>
        <div>Nộp bởi: {created_by?.name}</div>

        <AssignmentResultFiles currentFiles={files} userId={studentId} />

        {comments?.length > 0 && (
          <>
            <div>Bình luận:</div>

            {comments.map((e: any) => (
              <div>{e}</div>
            ))}
          </>
        )}
      </Col>

      <Col span={9}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>Chấm điểm</Col>

          <Col span={12} style={{ textAlign: 'right' }}>
            <Input suffix="/100" placeholder="" value={grade} onChange={(e) => setGrade(e.target.value)} />
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>Bình luận:</Col>

          <Col span={12} style={{ textAlign: 'right' }}>
            <Input placeholder="Thêm bình luận" value={comment} onChange={(e) => setComment(e.target.value)} />
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Button type="primary" onClick={handleSubmit}>
            Gửi
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default AssignmentResultDetail;
