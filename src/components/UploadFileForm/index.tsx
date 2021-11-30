import './style.scss';

import { FileExcelTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { file } from '@babel/types';
import { Button, Card, Modal } from 'antd';
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

import DocViewer from './doc';

const UploadFileForm = ({ id, currentFiles }: { id: string; currentFiles: string[] }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const { classId, assignmentId } = useParams<any>();
  const [fileUrl, setFileUrl] = useState<{ type: string; url: string } | undefined>(undefined);

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
        <div className="list-assignment-images">
          {currentFiles?.length > 0 &&
            currentFiles.map((e: string) => {
              const [typeFile, urlLink] = e.split('_');

              return (
                <div
                  key={e}
                  className="file-display-wrapper"
                  onClick={() => setFileUrl({ type: typeFile, url: urlLink })}
                >
                  {typeFile === 'image' && (
                    <HandledImage src={getFirebaseImageUrl({ id: e, path: ['assignments', assignmentId, userId] })} />
                  )}

                  {typeFile === 'docx' && <FileWordTwoTone style={{ fontSize: 50 }} />}

                  {typeFile === 'xlsx' && <FileExcelTwoTone style={{ fontSize: 50 }} twoToneColor="#52c41a" />}
                </div>
              );
            })}
        </div>

        <UploadFileButton files={files} setFiles={setFiles} />

        <Button onClick={handleSubmit} type="primary" disabled={file.length === 0}>
          Nộp
        </Button>
      </div>

      {!!fileUrl && (
        <Modal title="Basic Modal" visible={!!fileUrl} onCancel={() => setFileUrl(undefined)} footer={null} width="90%">
          <div style={{ margin: '0 auto' }}>
            {fileUrl.type !== 'image' && (
              <DocViewer
                source={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId, userId],
                })}
              />
            )}

            {fileUrl.type === 'image' && (
              <HandledImage
                src={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId, userId],
                })}
              />
            )}
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default UploadFileForm;
