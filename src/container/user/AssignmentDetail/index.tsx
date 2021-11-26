import './style.scss';

import { Avatar, Button, Card, Col, Row, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import BackButton from 'components/BackButton';
import UploadFile from 'components/UploadFile';
import storage from 'constants/firebase.config';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { AssignmentProps, ClassProps } from 'types/redux';
import { v4 as uuidv4 } from 'uuid';

const AssignmentDetail = () => {
  const { classId, assignmentId } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<any[]>([]);

  const {
    user: { classes, id: userId },
  } = useSelector((state) => state.auth);

  const currentClass: ClassProps = classes.find((e: ClassProps) => e._id === classId);
  const currentAssignment: any = currentClass.assignments.find((a: AssignmentProps) => a._id === assignmentId);

  const handleSubmit = async () => {
    let imageNames = [];

    await files
      .map((file) => file.originFileObj)
      .map((file) => {
        const fileName = uuidv4();
        imageNames.push(fileName);

        return storage
          .ref(`/assignments/${assignmentId}/${userId}/${fileName}`)
          .put(file)
          .on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
          );
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Row>
      <Col span={18}>
        <div className="home-recommendation">
          <div className="slide-wrap">
            {loading && (
              <div style={{ padding: '1.5rem 0.5rem', background: '#fff' }}>
                <Skeleton avatar active />
              </div>
            )}

            {!loading && (
              <Card
                title={<BackButton link={`/my-class/${classId}`} title={currentClass.name} />}
                style={{ width: '100%', minHeight: '400px', marginTop: '1rem' }}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    <div className="assignment-title-wrapper-01">
                      <div>
                        <div className="assignment-title">{currentAssignment.title}</div>

                        <div className="info">
                          {currentClass.teacher.name} • {moment(currentClass.updated_at).format('MMM DD yyyy')}
                        </div>

                        <div className="point">{currentAssignment.point ?? 'Chưa chấm'} điểm</div>
                      </div>

                      <div className="due-date">
                        Hạn nộp: {moment(currentAssignment.due_date).format('MMM DD yyyy, HH:mm')}
                      </div>
                    </div>
                  }
                  description={<div className="assignment-des">{currentAssignment.description}</div>}
                />
              </Card>
            )}
          </div>
        </div>
      </Col>

      <Col span={6}>
        <Card
          title={
            <div className="submit-title-wrapper">
              <div className="title">Nộp bài tập</div>

              <div className="status-submit">Missing</div>
            </div>
          }
          style={{ width: '100%', minHeight: '400px', marginTop: '1rem' }}
        >
          <div className="assignment-submit-button">
            <UploadFile files={files} setFiles={setFiles} />

            <Button onClick={handleSubmit} type="primary">
              Nộp
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AssignmentDetail;
