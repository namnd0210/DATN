import './style.scss';

import { DeleteOutlined, EditOutlined, PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAssignment, getAllAssignments } from 'redux/assignment/actions';
import { useSelector } from 'redux/reducer';
import { AssignmentProps } from 'types/redux';

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentProps | undefined>(undefined);
  const { loading, assignments } = useSelector((state) => state.assignment);
  const { isAdmin, isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAssignments());
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col span={24}>
        <PageHeaderLayout title="Thông tin cá nhân" subtitle="" text="" />
      </Col>
      <Col span={24}>
        {isAdmin || isTeacher ? (
          <Button
            onClick={() => {
              setSelectedAssignment(undefined);
            }}
            type="dashed"
            style={{ width: '100%', margin: '10px 0 10px 0' }}
          >
            <PlusCircleOutlined /> Tạo bài tập mới
          </Button>
        ) : null}
      </Col>
    </Row>
  );
};

export default Profile;
