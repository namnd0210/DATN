import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Pagination, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getAllAssignmentByUserId } from 'redux/assignment/actions';
import { deleteClass, getAllClasses } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';
import { AssignmentProps, ClassProps, ExamProps, UserProps } from 'types/redux';
import { buildApiUrl } from 'utils';

import ClassFormModal from './ClassFormModal';

const ClassManagement = () => {
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: UserProps, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: ClassProps) => (
        <span onClick={() => history.push(`/manage/class/${record._id}`)} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacher: UserProps) => <span>{teacher?.name}</span>,
    },
    {
      title: 'Bài thi',
      dataIndex: 'exam',
      key: 'exam',
      render: (exam: ExamProps) => <Link to={`exam/edit/${exam?._id}`}>{exam?.title}</Link>,
    },
    {
      title: 'Số học sinh',
      dataIndex: 'students',
      key: 'students',
      render: (students: UserProps[]) => students?.length,
    },
    {
      title: 'Số lượng bài tập',
      dataIndex: 'assignments',
      key: 'assignments',
      render: (assignments: AssignmentProps[]) => assignments?.length,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'create',
      key: 'create',
      render: (text: any, record: ClassProps) => (
        <span>{moment(record?.created_at || null).format('DD-MM-YYYY HH:mm')}</span>
      ),
    },
    {
      title: 'Hành động',
      //   title: "Action",
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: ClassProps) => (
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              setSelectedClass(record);
              setVisible(true);
            }}
            style={{ cursor: 'pointer', marginRight: 10 }}
          >
            <EditOutlined />
          </div>
          {isAdmin && (
            <div>
              <Popconfirm
                placement="topLeft"
                title={'Bạn chắc chắn muốn xóa lớp này không ?'}
                onConfirm={() => confirm(record._id)}
                okText="Có"
                cancelText="Không"
              >
                <DeleteOutlined />
              </Popconfirm>
            </div>
          )}
        </div>
      ),
    },
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassProps>();

  const { classes, loading } = useSelector((state) => state.class);

  const {
    isAdmin,
    user: { id },
  } = useSelector(({ auth }) => auth);

  const confirm = (id: string) => {
    id && dispatch(deleteClass(id));
  };

  const handleSizeChange = (page: any) => {
    const params = {
      page,
    };
    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  useEffect(() => {
    const tmpPage = querystring.parse(location.search).page || 1;
    const payload = {
      page: tmpPage,
    };

    dispatch(getAllAssignmentByUserId(id));
    dispatch(getAllClasses(payload));
  }, [dispatch, id, location]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Lớp học"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Dánh sách các lớp"
        />
      </Col>

      <Col xl={24}>
        {isAdmin && (
          <Button onClick={() => setVisible(true)} type="dashed" style={{ width: '100%', margin: '10px 0 10px 0' }}>
            <PlusCircleOutlined /> Thêm mới lớp học
          </Button>
        )}
        <Table
          columns={columns}
          loading={loading}
          dataSource={classes}
          rowKey={(record: any) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          current={+_.get(querystring.parse(location.search), 'page', 1)}
          key={+_.get(querystring.parse(location.search), 'page')}
          total={1}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      {visible && <ClassFormModal onClose={() => setVisible(false)} selectedClass={selectedClass} />}
    </Row>
  );
};

export default ClassManagement;
