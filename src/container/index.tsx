import Axios from 'axios';
import { LayoutWrapper } from 'common/LayoutWrapper';
import { PageHeaderLayout } from 'common/PageHeaderLayout';
import PrivateRoute from 'components/private-route';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'redux/reducer';
import { routes } from 'routers';
import { RouteType } from 'types/routers';

Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
} else {
  delete Axios.defaults.headers.common['Authorization'];
}

let publicRoutes: Array<RouteType> = [];

let privateRoutes: Array<RouteType> = [];

routes.forEach((e: RouteType) => {
  e.isPublic ? publicRoutes.push(e) : privateRoutes.push(e);
});

const App = () => {
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  return (
    <Router>
      <Switch>
        {publicRoutes.map((e: RouteType, i: number) => (
          <Route key={i} {...e} />
        ))}

        <LayoutWrapper>
          <Switch>
            <PrivateRoute isAuthenticated={isAuthenticated}>
              {privateRoutes.map((e: RouteType, i: number) => (
                <Route key={i} {...e} />
              ))}
            </PrivateRoute>
          </Switch>
        </LayoutWrapper>
      </Switch>
    </Router>
  );
};

export default App;
