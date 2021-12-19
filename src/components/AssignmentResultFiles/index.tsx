import './style.scss';

import { FileExcelTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import HandledImage from 'components/HandledImage';
import { getFirebaseImageUrl } from 'constants/firebase.config';
import { useState } from 'react';
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

  const [fileUrl, setFileUrl] = useState<{ type: string; url: string } | undefined>(undefined);

  return (
    <div className="list-assignment-images">
      {currentFiles &&
        currentFiles?.map((e: string) => {
          const [typeFile, urlLink] = e.split('_');

          return (
            <div key={e} className="file-display-wrapper" onClick={() => setFileUrl({ type: typeFile, url: urlLink })}>
              {typeFile === 'image' && (
                <HandledImage
                  src={getFirebaseImageUrl({ id: e, path: ['assignments', assignmentId, userId ?? currentId] })}
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
          <div style={{ margin: '0 auto' }}>
            {fileUrl.type !== 'image' && (
              <DocIframe
                source={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId, userId ?? currentId],
                })}
              />
            )}

            {fileUrl.type === 'image' && (
              <HandledImage
                src={getFirebaseImageUrl({
                  id: `${fileUrl.type}_${fileUrl.url}`,
                  path: ['assignments', assignmentId, userId ?? currentId],
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
