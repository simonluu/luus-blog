import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../actions/auth_action';

class AuthPage extends Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	handleOnClick(auth) {
		this.props.authenticate(auth);
		this.context.router.push('/');
	}

	renderAuthButton() {
		if (this.props.authenticated) {
			return <button onClick={() => this.handleOnClick(false)}>Sign Out</button>
		}
		return <button onClick={() => this.handleOnClick(true)}>Sign in</button>
	}

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				{this.renderAuthButton()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, { authenticate })(AuthPage);
