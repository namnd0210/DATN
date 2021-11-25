import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BackButton = ({ link, title }: { link: string; title: string }) => {
  return (
    <Link to={link} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <LeftOutlined />

      <div style={{ marginLeft: '1rem' }}>{title}</div>
    </Link>
  );
};

export default BackButton;
