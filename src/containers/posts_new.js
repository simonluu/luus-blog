import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { createPost } from '../actions/blog_action';
import requireAuth from '../components/require_authentication';

const renderInput = (field) => {
	return (
		<div className={`form-group ${field.meta.touched && field.meta.invalid ? 'danger' : ''}`}>
			<label>{field.label}:</label>
			<input type={field.type} className='form-control' {...field.input} />
			<div className="text-danger">
				{field.meta.touched ? field.meta.error : ''}
			</div>
		</div>
	);
}

const renderTextArea = (field) => {
	return (
		<div className={`form-group ${field.meta.touched && field.meta.invalid ? 'danger' : ''}`}>
			<label>{field.label}:</label>
			<textarea className='form-control' {...field.input} />
			<div className="text-danger">
				{field.meta.touched ? field.meta.error : ''}
			</div>
		</div>
	);
}

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog post has been created, navigate to index
				this.context.router.push('/');
			});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>

				<Field label="Title" name="title" component={renderInput} type="text" />
				<Field label="Categories" name="categories" component={renderInput} type="text" />
				<Field label="Content" name="content" component={renderTextArea} />

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
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

PostsNew = reduxForm({
	form: 'PostsNewForm',
	validate
})(PostsNew);

PostsNew = connect(null, { createPost })(PostsNew);

export default requireAuth(PostsNew);

				// <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
				// 	<label>Title:</label>
				// 	<input type='text' className='form-control' {...title} />
				// 	<div className="text-help">
				// 		{title.touched ? title.error : ''}
				// 	</div>
				// </div>

				// <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
				// 	<label>Categories:</label>
				// 	<input type='text' className='form-control' {...categories} />
				// 	<div className="text-help">
				// 		{categories.touched ? categories.error : ''}
				// 	</div>
				// </div>

				// <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
				// 	<label>Content:</label>
				// 	<textarea className='form-control' {...content} />
				// 	<div className="text-help">
				// 		{content.touched ? content.error : ''}
				// 	</div>
				// </div>