import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Pagination, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
// import { deleteClass, getAllClass } from '../../../redux/actions/class';
import { useSelector } from 'redux/reducer';
import { buildApiUrl } from 'utils';

const ClassManagement = () => {
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacher: {
        name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      }) => <span>{teacher?.name}</span>,
    },
    {
      title: 'Bài thi',
      dataIndex: 'exam',
      key: 'exam',
      render: (exam: {
        _id: any;
        title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
      }) => <Link to={`exam/edit/${exam?._id}`}>{exam?.title}</Link>,
    },
    {
      title: 'Số học sinh',
      dataIndex: 'students',
      key: 'students',
      render: (students: string | any[]) => students?.length,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'create',
      key: 'create',
      render: (text: any, record: { created_at: any }) => (
        <span>{moment(record?.created_at || null).format('DD-MM-YYYY HH:mm')}</span>
      ),
    },
    {
      title: 'Hành động',
      //   title: "Action",
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: { _id: string }) => (
        <div style={{ display: 'flex' }}>
          {console.log(record)}
          <div style={{ cursor: 'pointer', marginRight: 10 }}>
            <Link to={`class/update/${record?._id}`}>
              <EditOutlined />
            </Link>
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

  // const { classes, loadingClass, total, deleteStatus } = useSelector((_) => _.class);

  const { isAdmin } = useSelector(({ auth }) => auth);

  const confirm = (id: string) => {
    // id && dispatch(deleteClass(id));
  };

  const handleSizeChange = (page: any) => {
    const params = {
      page,
    };
    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  // useEffect(() => {
  //   const tmpPage = querystring.parse(location.search).page || 1;
  //   const payload = {
  //     page: tmpPage,
  //   };
  //   if (deleteStatus) {
  //     dispatch(getAllClass(payload));
  //     return;
  //   }
  //   dispatch(getAllClass(payload));
  // }, [dispatch, location, deleteStatus]);

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
          <Link to="class/add-new">
            <Button type="dashed" style={{ width: '100%', margin: '10px 0 10px 0' }}>
              <PlusCircleOutlined /> Thêm mới lớp học
            </Button>{' '}
          </Link>
        )}
        <Table
          columns={columns}
          // loading={loadingClass}
          dataSource={[]}
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
    </Row>
  );
};

export default ClassManagement;
