import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getAssignmentResultById } from 'redux/assignment-result/actions';
import { useSelector } from 'redux/reducer';

const AssignmentResultDetail = () => {
  const dispatch = useDispatch();
  const { assignmentId, assignmentResultId } = useParams<any>();
  const { result } = useSelector((state) => state.assignmentResult);

  console.log(result);

  useEffect(() => {
    if (assignmentResultId) {
      dispatch(getAssignmentResultById(assignmentResultId));
    }
  }, [assignmentResultId, dispatch]);

  return <div>AssignmentResultDetail {assignmentResultId}</div>;
};

export default AssignmentResultDetail;
