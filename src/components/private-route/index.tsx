import { FC, useCallback } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type PrivateRouteProps = RouteProps;

const PrivateRoute: FC<{
  children?: any;
  isAuthenticated?: boolean;
}> = ({ children, ...props }) => {
  const { isAuthenticated } = props;

  const render = useCallback<NonNullable<RouteProps['render']>>(
    () => (isAuthenticated ? children : <Redirect to="/" />),
    [isAuthenticated, children],
  );

  return <Route {...props} render={render} />;
};

export default PrivateRoute;
