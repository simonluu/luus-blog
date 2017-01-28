import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PostsReducer from './reducer_posts';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
	authenticated: AuthReducer,
	posts: PostsReducer,
	form: formReducer
});

export default rootReducer;
