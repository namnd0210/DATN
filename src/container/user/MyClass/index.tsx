import { Col, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllClassesByIds } from 'redux/class/actions';
import { useSelector } from 'redux/reducer';
import { ClassProps } from 'types/redux';
import { buildApiUrl } from 'utils';

const MyClass = () => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: ClassProps, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text: any) => <span>{text.name}</span>,
    },
  ];

  const {
    user: { classes },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (classes.length > 0) {
      dispatch(getAllClassesByIds({ classes: classes }));
    }
  }, [dispatch, classes]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout title="Các lớp hiện tại" subtitle="Xin chào" text="Danh sách bài tập" />
      </Col>
      <Col xl={24}>
        <Table
          columns={columns}
          //  loading={loading} dataSource={assignments}
          rowKey={(record) => record._id}
        />
      </Col>
    </Row>
  );
};

export default MyClass;
