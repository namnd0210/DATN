import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, message, Modal, Pagination, Popconfirm, Row, Table } from 'antd';
import useParams from 'hooks/useParams';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestion, getAllQuestions, importQuestionCsv } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';

import { PageHeaderLayout } from '../../../common/PageHeaderLayout';
import { AddNewQuestion } from './AddNewQuestion';

export const QuestionManagement = () => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: any, index: number) => <span>{(parsed?.page || 1 - 1) * 10 + (index + 1)}</span>,
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Mức độ khó',
      dataIndex: 'level',
      key: 'level',
      render: (text: moment.MomentInput, record: any) => <span>{record.level}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'length',
      key: 'length',
      render: (text: any, record: any) => <span>{record.category?.name}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: moment.MomentInput, record: any) => (
        <span>{moment(record.created_at).format('DD-MM-YYYY HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text: moment.MomentInput, record: any) => <span>{record.created_by?.name}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: { _id: React.SetStateAction<undefined> }) => (
        <div style={{ display: 'flex' }}>
          <div style={{ cursor: 'pointer', marginRight: 10 }}>
            <EditOutlined
              onClick={() => {
                setOpenUpdate(true);
                setSelectedQuestion(record);
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

  const { loadingQuestion, questions, total } = useSelector((state) => state.question);
  const [visible, setVisible] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>();
  const [file, setFile] = useState<Blob | null>(null);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const { parsed, setParams } = useParams();

  const dispatch = useDispatch();

  const confirm = (id: any) => {
    dispatch(deleteQuestion(id));
  };

  const handleImportCSV = useCallback(() => {
    if (file !== null) {
      if (
        [
          'text/csv',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ].includes(file.type)
      ) {
        var reader = new FileReader();
        reader.onload = function (event: any) {
          const body = event.target.result;

          dispatch(importQuestionCsv(body));
        };

        reader.readAsText(file);
      } else {
        message.error('Lỗi file');
      }
    }
    setFile(null);
    setOpenModalConfirm(false);
  }, [dispatch, file]);

  useEffect(() => {
    const tmpPage = parsed.page || 1;
    const payload = {
      page: tmpPage,
    };
    dispatch(getAllQuestions(payload));
  }, [dispatch, parsed.page]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xs={24}>
        <PageHeaderLayout title="Câu hỏi" subtitle="Xin chào" text="Danh sách câu hỏi" />
      </Col>
      <Col xs={24}>
        <Row>
          <Button type="dashed" style={{ flex: 1, margin: '10px 5px 10px 0' }} onClick={() => setVisible(true)}>
            <PlusCircleOutlined /> Thêm mới câu hỏi
          </Button>
          <div className="csv-wrapper">
            <label className="csv-btn" htmlFor="csv-import">
              Import csv
            </label>
            <input
              type="file"
              style={{ flex: 1, margin: '10px 0 10px 5px' }}
              onChange={(e) => {
                if (e.target.files instanceof FileList) {
                  setFile(e.target.files[0]);
                  setOpenModalConfirm(true);
                }
              }}
            />
          </div>

          {openModalConfirm && (
            <Modal
              visible={openModalConfirm}
              onOk={handleImportCSV}
              onCancel={() => {
                setOpenModalConfirm(false);
              }}
            >
              <p>Bạn có chắc chắn muốn import file csv câu hỏi không?</p>
            </Modal>
          )}
        </Row>
        <Table
          columns={columns}
          loading={loadingQuestion}
          dataSource={questions}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          current={+_.get(parsed, 'page', 1)}
          key={+_.get(parsed, 'page')}
          onChange={(page) => setParams({ page })}
          total={total}
        />
      </Col>

      {/* add new modal */}
      <AddNewQuestion visible={visible} setVisible={setVisible} />
      <AddNewQuestion
        visible={openUpdate}
        setVisible={() => {
          setSelectedQuestion(null);
          setOpenUpdate(false);
        }}
        question={selectedQuestion}
      />
    </Row>
  );
};
