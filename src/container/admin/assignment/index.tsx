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

import { AssignmentFormModal } from './AssignmentFormModal';

const AssignmentManagement = () => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: AssignmentProps, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: AssignmentProps) => <span className="ellipsis">{record.title}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: AssignmentProps) => <span className="ellipsis">{record.description}</span>,
    },
    {
      title: 'Hạn nộp',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (text: any) => <span>{moment(text).format('DD-MM-YYYY HH:MM:SS')}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: any) => <span>{moment(text).format('DD-MM-YYYY HH:MM:SS')}</span>,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text: any) => <span>{text.name}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: AssignmentProps) => {
        if (isAdmin || isTeacher)
          return (
            <div style={{ display: 'flex' }}>
              <div
                onClick={() => {
                  setVisible(true);
                  setSelectedAssignment(record);
                }}
                style={{ cursor: 'pointer', marginRight: 10 }}
              >
                <EditOutlined />
              </div>

              <div style={{ cursor: 'pointer', marginRight: 10 }}>
                <Popconfirm
                  placement="topLeft"
                  title={'Bạn chắc chắn muốn xóa bài tập này không?'}
                  onConfirm={() => confirm(record._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            </div>
          );
        return (
          <div style={{ cursor: 'pointer' }}>
            <PlayCircleOutlined />
          </div>
        );
      },
    },
  ];

  const confirm = (id: any) => {
    dispatch(deleteAssignment(id));
  };

  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentProps | undefined>(undefined);
  const { loading, assignments } = useSelector((state) => state.assignment);
  const { isAdmin, isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllAssignments());
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout title="Bài tập" subtitle="Xin chào" text="Danh sách bài tập" />
      </Col>
      <Col xl={24}>
        {isAdmin || isTeacher ? (
          <Button
            onClick={() => {
              setVisible(true);
              setSelectedAssignment(undefined);
            }}
            type="dashed"
            style={{ width: '100%', margin: '10px 0 10px 0' }}
          >
            <PlusCircleOutlined /> Tạo bài tập mới
          </Button>
        ) : null}

        <Table columns={columns} loading={loading} dataSource={assignments} rowKey={(record) => record._id} />
      </Col>

      {visible && <AssignmentFormModal onClose={() => setVisible(false)} selectedAssignment={selectedAssignment} />}
    </Row>
  );
};

export default AssignmentManagement;
