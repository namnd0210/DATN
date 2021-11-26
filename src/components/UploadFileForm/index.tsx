import './style.scss';

import { Button, Card } from 'antd';
import HandledImage from 'components/HandledImage';
import UploadFileButton from 'components/UploadFileButton';
import storage, { getFirebaseImageUrl } from 'constants/firebase.config';
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
        const fileName = uuidv4();
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

        currentFiles.length === 0
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
        <div className="list-assignment-images">
          {currentFiles?.length > 0 &&
            currentFiles.map((e: string) => (
              <div key={e} style={{ margin: 1, width: 50, height: 50 }}>
                <HandledImage src={getFirebaseImageUrl({ id: e, path: ['assignments', assignmentId, userId] })} />
              </div>
            ))}
        </div>

        <UploadFileButton files={files} setFiles={setFiles} />

        <Button onClick={handleSubmit} type="primary">
          Nộp
        </Button>
      </div>
    </Card>
  );
};

export default UploadFileForm;
