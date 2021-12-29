import { DeleteOutlined, EditOutlined, PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategory } from 'redux/category/actions';
import { deleteExam, getAllExams } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { ExamProps } from 'types/redux';

import { ExamFormModal } from './ExamFormModal';
import { RandomExamFormModal } from './RandomExamFormModal';

export const ExamManagement = () => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'stt',
      render: (text: any, record: ExamProps, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên bài thi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Số lượng câu hỏi',
      dataIndex: 'length',
      key: 'length',
      render: (text: any, record: ExamProps) => <span>{record?.questions?.length}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: any, record: ExamProps) => <span>{moment(text).format('DD-MM-YYYY HH:MM:SS')}</span>,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (
        text: any,
        record: {
          created_by: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined };
        },
      ) => <span>{record?.created_by?.name}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: ExamProps) => {
        if (isAdmin || isTeacher)
          return (
            <div style={{ display: 'flex' }}>
              <div
                onClick={() => {
                  setVisible(true);
                  setSelectedExam(record);
                }}
                style={{ cursor: 'pointer', marginRight: 10 }}
              >
                <EditOutlined />
              </div>

              <div style={{ cursor: 'pointer', marginRight: 10 }}>
                <Popconfirm
                  placement="topLeft"
                  title={'Bạn chắc chắn muốn xóa bộ câu hỏi này không ?'}
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
    dispatch(deleteExam(id));
  };

  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [randomExamVisible, setRandomExamVisible] = useState<boolean>(false);
  const [selectedExam, setSelectedExam] = useState<ExamProps>();
  const { loading, exams } = useSelector((state) => state.exam);
  const { isAdmin, isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllExams());
    dispatch(getAllCategory());
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xs={24}>
        <PageHeaderLayout title="Bài thi" subtitle="Xin chào" text="Danh sách bài thi" />
      </Col>
      <Col xs={24}>
        {isAdmin || isTeacher ? (
          <Row>
            <Button
              onClick={() => {
                setVisible(true);
                setSelectedExam(undefined);
              }}
              type="dashed"
              style={{ flex: 1, margin: '10px 5px 10px 0' }}
            >
              <PlusCircleOutlined /> Tạo bài thi mới
            </Button>
            <Button
              onClick={() => {
                setRandomExamVisible(true);
              }}
              type="primary"
              style={{ flex: 1, margin: '10px 0 10px 5px' }}
            >
              <PlusCircleOutlined /> Tạo bài thi ngẫu nhiên
            </Button>
          </Row>
        ) : null}

        <Table columns={columns} loading={loading} dataSource={exams} rowKey={(record) => record?._id} />
      </Col>
      {randomExamVisible && <RandomExamFormModal onClose={() => setRandomExamVisible(false)} />}
      {visible && <ExamFormModal onClose={() => setVisible(false)} selectedExam={selectedExam} />}
    </Row>
  );
};
