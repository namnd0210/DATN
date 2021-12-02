import './style.scss';

import { FileExcelTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { file } from '@babel/types';
import { Button, Card, Modal } from 'antd';
import AssignmentResultFiles from 'components/AssignmentResultFiles';
import HandledImage from 'components/HandledImage';
import UploadFileButton from 'components/UploadFileButton';
import storage, { getFirebaseImageUrl } from 'constants/firebase.config';
import { handleFileType } from 'constants/handleFile';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createAssignmentResult, updateAssignmentResult } from 'redux/assignment-result/actions';
import { useSelector } from 'redux/reducer';
import { v4 as uuidv4 } from 'uuid';

const UploadFileForm = ({ id, currentFiles }: { id: string; currentFiles: string[] }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const { classId, assignmentId } = useParams<any>();

  const {
    user: { id: userId },
  } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
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
        const payload = {
          files: fileNames,
          assignment: assignmentId,
          class: classId,
          created_by: userId,
        };

        files.length === 0
          ? dispatch(createAssignmentResult(payload))
          : dispatch(updateAssignmentResult({ ...payload, _id: id }));

        setFiles([]);
      })
      .catch((err) => console.log(err));
  };

  return (
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
        <AssignmentResultFiles currentFiles={currentFiles} />

        <UploadFileButton files={files} setFiles={setFiles} />

        <Button onClick={handleSubmit} type="primary" disabled={file.length === 0}>
          Nộp
        </Button>
      </div>
    </Card>
  );
};

export default UploadFileForm;
