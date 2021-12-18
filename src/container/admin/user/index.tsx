import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Divider, Pagination, Popconfirm, Row, Table } from 'antd';
import _ from 'lodash';
import querystring from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { deleteUser, getAllUsers } from 'redux/user/actions';
import { UserProps } from 'types/redux';
import { buildApiUrl } from 'utils';

import { PageHeaderLayout } from '../../../common/PageHeaderLayout';
import UserFormModal from './UserFormModal';

const UserManagement = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      render: (role: number) => {
        let roleString = 'Học sinh';
        if (role === 0) roleString = 'Admin';
        if (role === 1) roleString = 'Giáo viên';
        return <span>{roleString}</span>;
      },
    },

    {
      // title: "Hành động",
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: UserProps) => {
        return (
          record.role !== 0 && (
            <div style={{ display: 'flex' }}>
              <div style={{ cursor: 'pointer', marginRight: 10 }}>
                <EditOutlined
                  onClick={() => {
                    setSelectedUser(record);
                    setVisible(true);
                  }}
                />
              </div>
              <div>
                <Popconfirm
                  placement="topLeft"
                  title={'Bạn chắc chắn muốn xóa người d này không ?'}
                  onConfirm={() => confirm(record._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            </div>
          )
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { users, loading } = useSelector(({ user }) => user);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps>();

  const confirm = (id: any) => {
    id && dispatch(deleteUser(id));
  };

  const handleSizeChange = (page: any) => {
    const params = {
      page,
    };
    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  useEffect(() => {
    const tmpPage = querystring.parse(location.search).page || 1;

    dispatch(getAllUsers({ page: tmpPage }));
  }, [location, dispatch]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Danh sách thành viên"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Danh sách thành viên trong hệ thống"
        />
      </Col>
      <Col xl={24}>
        {/* <Button
					type="dashed"
					style={{ width: "100%", margin: "10px 0 10px 0" }}
					onClick={() => setVisible(true)}
				>
					<PlusCircleOutlined /> Thêm mới danh mục câu hỏi
				</Button> */}
        <Table
          columns={columns}
          loading={loading}
          dataSource={users}
          rowKey={(record: any) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          // current={+page || 1}
          current={+_.get(querystring.parse(location.search), 'page', 1)}
          key={+_.get(querystring.parse(location.search), 'page')}
          total={users.length}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      <UserFormModal visible={visible} setVisible={setVisible} currentUser={selectedUser} />
    </Row>
  );
};

export default UserManagement;
