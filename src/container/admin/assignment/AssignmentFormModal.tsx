import '../../../assets/styles/add-exam.scss';

import { Button, Col, DatePicker, Form, Input, message, Modal, Row } from 'antd';
import AssignmentResultFiles from 'components/AssignmentResultFiles';
import UploadFileButton from 'components/UploadFileButton';
import storage from 'constants/firebase.config';
import { handleFileType } from 'constants/handleFile';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAssignment, updateAssignment } from 'redux/assignment/actions';
import { getAllQuestions } from 'redux/question/actions';
import { useSelector } from 'redux/reducer';
import { AssignmentProps } from 'types/redux';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';

type Props = {
  onClose: () => void;
  selectedAssignment?: AssignmentProps;
};

export const AssignmentFormModal = ({ onClose, selectedAssignment }: Props) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any[]>([]);

  const {
    user: { id: userId },
  } = useSelector((state) => state.auth);

  const handleUploadFiles = async ({ newAssignment, assignmentId }: { newAssignment: any; assignmentId: string }) => {
    let fileNames: string[] = [];
    let promises: any[] = [];

    await files
      .map((file) => file.originFileObj)
      .map((file) => {
        const fileName = handleFileType(file.type) + '_' + uuidv4();
        fileNames.push(fileName);

        const uploadTask = storage.ref(`/assignments/${assignmentId}/${userId}/${fileName}`).put(file);
        promises.push(uploadTask);

        return uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
        );
      });

    Promise.all(promises)
      .then(() => {
        const payload = { ...newAssignment, files: fileNames, _id: assignmentId };

        dispatch(updateAssignment({ data: payload }));
        setFiles([]);
      })
      .catch((err) => console.log(err));
  };

  const onFinish = (values: any) => {
    let newAssignment: any = { ...values, created_by: userId };
    if (newAssignment.title === '') {
      message.error('Kh??ng ???????c ????? tr???ng ti??u ?????');
    } else if (newAssignment.description === '') {
      message.error('Kh??ng ???????c ????? tr???ng m?? t???');
    } else {
      !selectedAssignment
        ? dispatch(
            createAssignment({
              data: newAssignment,
              handleUploadFiles: (assignmentId: string) => handleUploadFiles({ newAssignment, assignmentId }),
            }),
          )
        : dispatch(
            updateAssignment({
              data: { ...newAssignment, _id: selectedAssignment._id },
              handleUploadFiles: (assignmentId: string) => handleUploadFiles({ newAssignment, assignmentId }),
            }),
          );
    }

    onClose();
  };

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      visible
      title={!selectedAssignment ? 'Th??m b??i t???p' : 'C???p nh???t b??i t???p'}
      onCancel={onClose}
      width={600}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        initialValues={{
          title: selectedAssignment?.title ?? '',
          description: selectedAssignment?.description ?? '',
          due_date: moment(selectedAssignment?.due_date) ?? moment(),
        }}
      >
        <Row gutter={16} style={{ background: '#fff', margin: '1rem 0' }}>
          <Col xs={24}>
            <div className="add-exam-item">
              <div className="add-exam-item__label">T??n b??i t???p</div>
              <div className="add-exam-item__main">
                <Form.Item name="title">
                  <input placeholder="Ti??u ????? b??i t???p" name="title" />
                </Form.Item>
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">M?? t???</div>
              <div className="add-exam-item__main">
                <Form.Item name="description">
                  <TextArea placeholder="M?? t??? b??i t???p" autoSize />
                </Form.Item>
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">File ph????ng ti???n</div>

              <div>
                <AssignmentResultFiles
                  currentFiles={selectedAssignment?.files}
                  assignmentId={selectedAssignment?._id}
                  userId={selectedAssignment?.created_by?._id ?? userId}
                />
              </div>

              <div className="add-exam-item__main">
                <UploadFileButton files={files} setFiles={setFiles} />
              </div>
            </div>

            <div className="add-exam-item">
              <div className="add-exam-item__label">H???n n???p</div>
              <div className="add-exam-item__main">
                <Form.Item name="due_date">
                  <DatePicker format={dateFormat} />
                </Form.Item>
              </div>
            </div>

            <div className="btn-add-exam">
              <Button type="primary" htmlType="submit">
                {!selectedAssignment ? 'Th??m m???i' : 'C???p nh???t'}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
