import React from 'react';
import { Route, IndexRoute } from 'react-router';

// imports main application
import App from './components/app';

import PostsIndex from './containers/posts_index';
import PostsNew from './containers/posts_new';
import PostsShow from './containers/posts_show';

import AuthenticationPage from './components/authenticationpage';

export default (
	<Route component={App}>
		<Route path="/luus-blog" component={PostsIndex} />
		<Route path="/luus-blog/posts/new" component={PostsNew} />
		<Route path="/luus-blog/posts/:id" component={PostsShow} />
		<Route path="/luus-blog/1eZAqU7HbXBrNXfy1rtx" component={AuthenticationPage} />
	</Route>
);