import { DeleteOutlined, EditOutlined, PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExam, getAllExams } from 'redux/exam/actions';
import { useSelector } from 'redux/reducer';
import { ExamProps } from 'types/redux';

import { ExamFormModal } from './ExamFormModal';

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
      render: (text: any, record: ExamProps) => <span>{record.questions.length}</span>,
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
      ) => <span>{record.created_by.name}</span>,
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
  const [selectedExam, setSelectedExam] = useState<ExamProps>();
  const { loading, exams } = useSelector((state) => state.exam);
  const { isAdmin, isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllExams());
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Bài thi"
          subtitle="Xin chào"
          // text="Exam list, chose one couse and complete or can create new one"
          text="Danh sách bài thi"
        />
      </Col>
      <Col xl={24}>
        {isAdmin || isTeacher ? (
          <Button
            onClick={() => {
              setVisible(true);
              setSelectedExam(undefined);
            }}
            type="dashed"
            style={{ width: '100%', margin: '10px 0 10px 0' }}
          >
            <PlusCircleOutlined /> Tạo bài thi mới
          </Button>
        ) : null}

        <Table columns={columns} loading={loading} dataSource={exams} rowKey={(record) => record._id} />
      </Col>

      {visible && <ExamFormModal onClose={() => setVisible(false)} selectedExam={selectedExam} />}
    </Row>
  );
};
