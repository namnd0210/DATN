import './style.scss';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, message, Popconfirm, Row, Upload } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import { getFirebaseImageUrl } from 'constants/firebase.config';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'redux/reducer';
import { AssignmentProps } from 'types/redux';

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const Profile = () => {
  const dispatch = useDispatch();
  const { name, email, id: userId } = useSelector((state) => state.auth.user);
  const [file, setFile] = useState<any>(
    getFirebaseImageUrl({
      id: userId,
      path: ['avatars'],
    }) ?? '',
  );
  const { role } = useSelector((state) => state.auth.user);

  //TODO: upload single image

  // const handleSubmit = async () => {
  //   let fileNames: string[] = [];
  //   let promises: any[] = [];

  //   await files
  //     .map((file) => file.originFileObj)
  //     .map((file) => {
  //       const fileName = handleFileType(file.type) + '_' + uuidv4();
  //       fileNames.push(fileName);

  //       const uploadTask = storage.ref(`/assignments/${assignmentId}/${userId}/${fileName}`).put(file);
  //       promises.push(uploadTask);

  //       return uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {},
  //         (error) => {
  //           console.log(error);
  //         },
  //       );
  //     });

  //   Promise.all(promises)
  //     .then(() => {
  //       const payload = {
  //         files: fileNames,
  //         assignment: assignmentId,
  //         class: classId,
  //         created_by: userId,
  //       };

  //       isEqual(currentAssignmentResult, {})
  //         ? dispatch(createAssignmentResult(payload))
  //         : dispatch(updateAssignmentResult({ ...payload, _id: currentAssignmentResult._id }));

  //       setFiles([]);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const uploadProps = {
    name: 'file',
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    customRequest: dummyRequest,
  };

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col span={24}>
        <PageHeaderLayout title="Thông tin cá nhân" subtitle="" text="" />

        <Form
          onFinish={onFinish}
          initialValues={{
            name: name ?? '',
            email: email ?? '',
          }}
        >
          <Row gutter={16} style={{ background: '#fff', margin: '1rem 0' }}>
            <Col xs={24}>
              <div className="add-exam-item">
                <div className="add-exam-item__label">Ảnh đại diện</div>
                <div>
                  <Avatar
                    src={file}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined />}
                  />

                  <Form.Item name="avatar">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>

              <div className="add-exam-item">
                <div className="add-exam-item__label">Vai trò</div>
                <div className="add-exam-item__main">
                  {role === 0 ? 'Quản trị viên' : role === 1 ? 'Giáo viên' : 'Sinh viên'}
                </div>
              </div>

              <div className="add-exam-item">
                <div className="add-exam-item__label">Tên</div>
                <div className="add-exam-item__main">
                  <Form.Item name="name">
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="add-exam-item">
                <div className="add-exam-item__label">Email cá nhân</div>
                <div className="add-exam-item__main">
                  <Form.Item name="email">
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => {}}>
          Cập nhật
        </Button>
      </Col>
    </Row>
  );
};

export default Profile;
