import 'assets/styles/pageheader.scss';

import { PageHeader, Row, Typography } from 'antd';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'redux/reducer';

const { Paragraph } = Typography;

const content = (text: string, isAdmin: boolean, isTeacher: boolean) => (
  <>
    <Paragraph>{text}</Paragraph>
    <div>
      {isAdmin || isTeacher ? (
        <>
          <NavLink to="/exam" className="ant-btn" style={{ marginRight: 10 }}>
            Bài thi
          </NavLink>
          <NavLink to="/question" className="ant-btn" style={{ marginRight: 10 }}>
            Câu hỏi
          </NavLink>
          <NavLink to="/category" className="ant-btn" style={{ marginRight: 10 }}>
            Danh mục câu hỏi
          </NavLink>
          <NavLink to="/class" className="ant-btn" style={{ marginRight: 10 }}>
            Lớp
          </NavLink>
        </>
      ) : (
        <NavLink to="/my-class" className="ant-btn" style={{ marginRight: 10 }}>
          Lớp học
        </NavLink>
      )}

      {isAdmin && (
        <NavLink to="/users" className="ant-btn" style={{ marginRight: 10 }}>
          {/* Reports */}
          Thành viên
        </NavLink>
      )}

      <NavLink to="/report" className="ant-btn" style={{ marginRight: 10 }}>
        {/* Reports */}
        Kết quả
      </NavLink>
    </div>
  </>
);

const Content = ({ children, extraContent }: { children: ReactElement; extraContent: ReactElement }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};
export const PageHeaderLayout = ({ title, subtitle, text }: { title: string; subtitle: string; text: string }) => {
  const { isAdmin, isTeacher } = useSelector(({ auth }) => auth);

  return (
    <PageHeader title={title} className="site-page-header" subTitle={subtitle} ghost={false}>
      <Content
        extraContent={
          <img src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" alt="content" width="100px" />
        }
      >
        {content(text, isAdmin, isTeacher)}
      </Content>
    </PageHeader>
  );
};
