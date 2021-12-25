import './style.scss';

import { FileExcelTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import HandledImage from 'components/HandledImage';
import { getFirebaseImageUrl } from 'constants/firebase.config';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'redux/reducer';

import DocIframe from '../DocIframe';

const AssignmentResultFiles = ({
  currentFiles,
  assignmentId,
  userId,
}: {
  currentFiles?: string[];
  assignmentId?: string;
  userId?: string;
}) => {
  const {
    user: { id: currentId },
  } = useSelector((state) => state.auth);
  const { assignmentId: currentAssignmentId } = useParams<any>();
  const [fileUrl, setFileUrl] = useState<{ type: string; url: string } | undefined>(undefined);

  return (
    <div className="list-assignment-images">
      {currentFiles &&
        currentFiles?.map((e: string) => {
          const [typeFile, urlLink] = e.split('_');

          // console.log(
          //   getFirebaseImageUrl({
          //     id: e,
          //     path: ['assignments', assignmentId ?? currentAssignmentId, userId ?? currentId],
          //   }),
          // );

          return (
            <div key={e} className="file-display-wrapper" onClick={() => setFileUrl({ type: typeFile, url: urlLink })}>
              {typeFile === 'image' && (
                <HandledImage
                  src={getFirebaseImageUrl({
                    id: e,
                    path: ['assignments', assignmentId ?? currentAssignmentId, userId ?? currentId],
                  })}
                />
              )}

              {typeFile === 'docx' && <FileWordTwoTone style={{ fontSize: 50 }} />}

              {['application', 'xlsx'].includes(typeFile) && (
                <FileExcelTwoTone style={{ fontSize: 50 }} twoToneColor="#52c41a" />
              )}
            </div>
          );
        })}

      {!!fileUrl && (
        <Modal title="Basic Modal" visible={!!fileUrl} onCancel={() => setFileUrl(undefined)} footer={null} width="90%">
          <div style={fileUrl.type === 'image' ? { display: 'flex', justifyContent: 'center' } : { margin: '0 auto' }}>
            {fileUrl.type !== 'image' && (
              <DocIframe
                source={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId ?? currentAssignmentId, userId ?? currentId],
                })}
              />
            )}

            {fileUrl.type === 'image' && (
              <HandledImage
                src={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId ?? currentAssignmentId, userId ?? currentId],
                })}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AssignmentResultFiles;
