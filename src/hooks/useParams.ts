import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { buildApiUrl } from 'utils';

const useParams = () => {
  const location = useLocation();
  const history = useHistory();
  const pathname: string = location.pathname;
  const parsed: any = useMemo(() => queryString.parse(location.search), [location.search]);

  const setParams = useCallback(
    (newParams: any) => history.push(`${location.pathname}${buildApiUrl({ ...parsed, ...newParams })}`),
    [history, location.pathname, parsed],
  );

  return { pathname, parsed, setParams };
};

export default useParams;
