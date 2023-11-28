// https://github.com/remix-run/react-router/issues/9630#issuecomment-1341643731
import { createBrowserHistory } from '@remix-run/router';

export const browserHistory = createBrowserHistory({ v5Compat: true });
