import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Pagination, Popconfirm, Row, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { buildApiUrl } from 'utils';

import { PageHeaderLayout } from '../../../common/PageHeaderLayout';
import { AddNewQuestion } from './AddNewQuestion';
import { UpdateQuestion } from './Updatequestion';

export const QuestionManagement = () => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Danh mục',
      dataIndex: 'length',
      key: 'length',
      render: (
        text: any,
        record: {
          category: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined };
        },
      ) => <span>{record.category?.name}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: moment.MomentInput, record: any) => <span>{moment(text).format('DD-MM-YYYY HH:MM:SS')}</span>,
    },
    {
      title: 'Hành động',
      // title: "Action",
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: { _id: React.SetStateAction<undefined> }) => (
        <div style={{ display: 'flex' }}>
          <div style={{ cursor: 'pointer', marginRight: 10 }}>
            <EditOutlined
              onClick={() => {
                setOpenUpdate(true);
                setUpdateId(record._id);
                console.log('22');
              }}
            />
          </div>
          <div>
            <Popconfirm
              placement="topLeft"
              title={'Bạn chắc chắn muốn xóa câu hỏi này không ?'}
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

  const { loadingQuestions, questions, total } = useSelector((state) => state.question);
  const [visible, setVisible] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const confirm = (id: any) => {
    dispatch(removeQuestion(id));
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
    dispatch(getAllQuestions(payload));
  }, [location, dispatch]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Câu hỏi"
          subtitle="Xin chào"
          // text="Questions list, you can create, update or remove question"
          text="Danh sách câu hỏi"
        />
      </Col>
      <Col xl={24}>
        <Button type="dashed" style={{ width: '100%', margin: '10px 0 10px 0' }} onClick={() => setVisible(true)}>
          <PlusCircleOutlined /> Thêm mới câu hỏi
        </Button>
        <Table
          columns={columns}
          loading={loadingQuestions}
          dataSource={questions}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          current={+_.get(querystring.parse(location.search), 'page', 1)}
          key={+_.get(querystring.parse(location.search), 'page')}
          total={total}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      {/* add new modal */}
      <AddNewQuestion visible={visible} setVisible={setVisible} />
      <UpdateQuestion visible={openUpdate} setVisible={setOpenUpdate} id={updateId} />
    </Row>
  );
};
