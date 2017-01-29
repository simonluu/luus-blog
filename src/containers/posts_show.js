import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost, deletePost } from '../actions/blog_action';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => {
				this.context.router.push('/luus-blog');
			});
	}

	renderDeletePost() {
		if (this.props.authenticated) {
			return (
				<button
					className="btn btn-danger pull-right"
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
			);
		}
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
			<div style={{ textAlign: 'center' }}>
				<Link to='/luus-blog'>Back to Main Page</Link>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
				{this.renderDeletePost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post, authenticated: state.authenticated };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);