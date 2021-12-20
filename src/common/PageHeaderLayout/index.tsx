import 'assets/styles/pageheader.scss';

import { PageHeader, Row, Typography } from 'antd';
import { ReactElement } from 'react';

const { Paragraph } = Typography;

const Content = ({ children, extraContent }: { children: ReactElement; extraContent: ReactElement }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};
export const PageHeaderLayout = ({ title, subtitle, text }: { title: string; subtitle: string; text: string }) => {
  return (
    <PageHeader title={title} className="site-page-header" subTitle={subtitle} ghost={false}>
      <Content
        extraContent={
          <img src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" alt="content" width="100px" />
        }
      >
        <Paragraph>{text}</Paragraph>
      </Content>
    </PageHeader>
  );
};
