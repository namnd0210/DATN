import { Button, Modal, Result } from 'antd';
import React from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

export const ResultModal = memo(({ visible, resultsdata, exam }: any) => {
  const RenderBtn = () => (
    <>
      <Button type="primary" key="console">
        <Link to="/report"> Về trang kết quả</Link>
      </Button>
      <Button key="buy">
        <Link to="/home">Về trang chủ</Link>
      </Button>
    </>
  );

  return (
    <Modal visible={visible} footer={null}>
      <Result
        status="success"
        title="Bạn đã hoàn thành bài thi"
        subTitle={`Bài thi :${exam?.title},  Kết quả: ${resultsdata?.result}`}
        extra={<RenderBtn />}
      />
    </Modal>
  );
});
