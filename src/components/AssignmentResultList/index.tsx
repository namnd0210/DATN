import { Avatar, Button, Card, Empty, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Link, useRouteMatch } from 'react-router-dom';
import { AssignmentResultProps } from 'types/redux';

const AssignmentResultList = ({ list, loading }: { list: AssignmentResultProps[]; loading: boolean }) => {
  const { url } = useRouteMatch();

  if (!list) return null;

  if (list.length === 0) return <Empty />;

  return (
    <div>
      {list.length > 0 &&
        list.map((e, i) => (
          <div key={i}>
            {loading && (
              <div style={{ marginTop: '1rem', padding: '1.5rem 0.5rem', background: '#fff' }}>
                <Skeleton avatar active />
              </div>
            )}

            {!loading && (
              <Card style={{ width: '100%', marginTop: '1rem' }}>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={e.created_by.name}
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                      <div className="pre-assignment-des">{e.assignment.description}</div>

                      <Button type="primary">
                        <Link to={`${url}/assignment-result/${e._id}`}>Chi tiết</Link>
                      </Button>
                    </div>
                  }
                />
              </Card>
            )}
          </div>
        ))}
    </div>
  );
};

export default AssignmentResultList;
