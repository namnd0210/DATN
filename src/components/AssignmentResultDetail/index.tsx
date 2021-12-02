import React from 'react';
import { useParams } from 'react-router';

const AssignmentResultDetail = () => {
  const { assignmentId, assignmentResultId } = useParams<any>();

  return <div>AssignmentResultDetail {assignmentResultId}</div>;
};

export default AssignmentResultDetail;
