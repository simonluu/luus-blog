import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions/blog_action';
import requireAuth from '../components/require_authentication';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog post has been created, navigate to index
				this.context.router.push('/luus-blog');
			});
	}

	render() {
		const { fields: { title, categories, content }, handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>

				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title:</label>
					<input type='text' className='form-control' {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories:</label>
					<input type='text' className='form-control' {...categories} />
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content:</label>
					<textarea className='form-control' {...content} />
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/luus-blog" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Please enter a title';
	}

	if (!values.categories) {
		errors.categories = 'Please enter some categories';
	}

	if (!values.content) {
		errors.content = 'Please enter some content';
	}

	return errors;
}

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(requireAuth(PostsNew));