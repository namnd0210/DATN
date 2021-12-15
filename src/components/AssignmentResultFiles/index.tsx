import { FileExcelTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import HandledImage from 'components/HandledImage';
import { getFirebaseImageUrl } from 'constants/firebase.config';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'redux/reducer';

import DocIframe from '../DocIframe';

const AssignmentResultFiles = ({ currentFiles, userId }: { currentFiles?: string[]; userId?: string }) => {
  const { assignmentId } = useParams<any>();

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

              {typeFile === 'xlsx' && <FileExcelTwoTone style={{ fontSize: 50 }} twoToneColor="#52c41a" />}
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
