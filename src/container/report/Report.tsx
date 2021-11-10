import { Col, Divider, Pagination, Row, Table } from 'antd';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import _ from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { getAllResults } from 'redux/result/actions';
import { ResultProps } from 'types/redux';
import { buildApiUrl } from 'utils';

import { getResultByUserId } from './../../redux/result/actions';

export const Report = () => {
  const { results, loading, total } = useSelector(({ result }) => result);
  const { user, isAdmin } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const columns: any = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (record: ResultProps, index: number, k: string) => <span>{k}</span>,
    },
    {
      title: 'Bài thi',
      dataIndex: 'exam',
      key: 'exam',
      render: (e: any) => {
        if (!e?._id) {
          return 'Bài thi đã bị xóa khỏi hệ thống';
        } else {
          return <Link to={`exam/take/${e?._id}`}>{e?.title}</Link>;
        }
      },
    },
    {
      title: 'Cập nhật gần nhất',
      dataIndex: 'last_update',
      key: 'last_update',
      render: (e: any) => <span>{moment(e).format('DD-MM-YYYY HH:MM:SS')}</span>,
    },
    {
      title: 'Ứng viên',
      dataIndex: 'user',
      key: 'user',
      render: (e: any) => <span>{e.username}</span>,
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
    },
  ];

  const handleSizeChange = (page: number) => {
    const params = {
      page,
    };

    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  useEffect(() => {
    const tmpPage = querystring.parse(location.search).page || 1;
    const payload = {
      page: tmpPage,
    };
    isAdmin ? dispatch(getAllResults(payload)) : dispatch(getResultByUserId({ id: user.id }));
    // eslint-disable-next-line
  }, [location]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Kết quả"
          subtitle="Xin chào"
          //   text="View your report here !!!"
          text="Xem kết quả của bạn tại đây"
        />
      </Col>
      <Col xl={24}>
        <Table dataSource={results} columns={columns} loading={loading} rowKey={(e) => e._id} pagination={false} />
        <Divider />
        <Pagination
          current={+_.get(querystring.parse(location.search), 'page', 1)}
          key={+_.get(querystring.parse(location.search), 'page')}
          total={total}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>
    </Row>
  );
};
