import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const UploadFile = ({ files, setFiles }: { files: any[]; setFiles: any }) => {
  const props: any = {
    name: 'file',
    onChange(info: any) {
      setFiles(info.fileList);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
    },
    customRequest: dummyRequest,
  };

  return (
    <Upload multiple fileList={files} {...props}>
      <Button icon={<PlusOutlined />}>Thêm hoặc tạo mới</Button>
    </Upload>
  );
};

export default UploadFile;
