import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { buildApiUrl } from 'utils';

const useParams = () => {
  const location = useLocation();
  const history = useHistory();
  const pathname: string = location.pathname;
  const parsed: any = queryString.parse(location.search);

  const setParams = (newParams: any) => history.push(`${location.pathname}${buildApiUrl({ ...parsed, ...newParams })}`);

  return { pathname, parsed, setParams };
};

export default useParams;
