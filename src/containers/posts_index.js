import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/blog_action';
import { Link } from 'react-router';

class PostsIndex extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				<Link key={post.id} to={"/posts/" + post.id}>
					<li className="list-group-item">
							<span style={{ float: 'right' }}>{post.categories}</span>
							<strong>{post.title}</strong>
					</li>
				</Link>
			)
		})
	}

	renderAddPost() {
		if (this.props.authenticated) {
			return (
				<div className="text-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<a className="header-link" href="http://simonluu.com">
					<h3 style={{ textAlign: 'center' }}>Simon Luu's Blog</h3>
				</a>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
				{this.renderAddPost()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all, authenticated: state.authenticated };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);