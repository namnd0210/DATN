import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Pagination, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteCategory, getAllCategory } from 'redux/category/actions';
import { useSelector } from 'redux/reducer';
import { buildApiUrl } from 'utils';

import AddNewCategoryModal from './AddNewCategoryModal';
import { UpdateCategory } from './UpdateCategory';

const CategoryManagement = () => {
  const columns: any = [
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
      title: 'Ngày tạo',
      dataIndex: 'create',
      key: 'create',
      render: (text: any, record: { created_at: any }) => (
        <span>{moment(record?.created_at || null).format('DD-MM-YYYY HH:mm')}</span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: { _id: React.SetStateAction<null> }) => (
        <div style={{ display: 'flex' }}>
          <div style={{ cursor: 'pointer', marginRight: 10 }}>
            <EditOutlined
              onClick={() => {
                setUpdateId(record._id);
                setOpenUpdate(true);
              }}
            />
          </div>
          <div>
            <Popconfirm
              placement="topLeft"
              title={'Bạn chắc chắn muốn xóa câu danh mục này không ?'}
              onConfirm={() => confirm(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const confirm = (id: any) => {
    id && dispatch(deleteCategory(id));
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const { categories, loadingCategory } = useSelector(({ category }) => category);

  const handleSizeChange = (page: number) => {
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
    dispatch(getAllCategory(payload));
  }, [dispatch, location]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Danh mục"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Danh mục câu hỏi"
        />
      </Col>
      <Col xl={24}>
        <Button type="dashed" style={{ width: '100%', margin: '10px 0 10px 0' }} onClick={() => setVisible(true)}>
          <PlusCircleOutlined /> Thêm mới danh mục câu hỏi
        </Button>
        <Table
          columns={columns}
          loading={loadingCategory}
          dataSource={categories}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          current={+_.get(querystring.parse(location.search), 'page', 1)}
          key={+_.get(querystring.parse(location.search), 'page')}
          total={categories.length}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      <AddNewCategoryModal visible={visible} setVisible={setVisible} />
      <UpdateCategory visible={openUpdate} setVisible={setOpenUpdate} id={updateId} />
    </Row>
  );
};

export default CategoryManagement;
