import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';
import ErrorHandler from './ErrorHandler';
import * as api from '../api';

class PostComment extends React.Component {
	state = {
		username: '',
		comment_body: '',
		user: this.props.user,
		errMsg: null,
		errStatus: null
	};
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};
	handleSubmit = event => {
		const article_id = this.props.article_id;
		const { comment_body } = this.state;
		const username = this.props.user;
		event.preventDefault();
		api
			.postComment(article_id, username, comment_body)
			.then(() => {
				navigate(`/articles/${this.props.article_id}/comments`);
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	};
	render() {
		const id = this.props.article_id;
		const { errStatus, errMsg } = this.state;
		if (errStatus)
			return <ErrorHandler errMsg={errMsg} errStatus={errStatus} />;
		return (
			<>
				<header>
					<h1>Posting comment on (i need the article title to live here)</h1>
					<ul>
						<li>
							<Link to="/" user={this.state.user}>
								Home
							</Link>
						</li>
						<li>
							<Link to="/articles" user={this.state.user}>
								Articles
							</Link>
						</li>
						<li>
							<Link to={`/articles/${id}`} user={this.state.user}>
								Back to article
							</Link>
						</li>
						<li>
							<Link to={`/articles/${id}/comments`} user={this.state.user}>
								Article Comments
							</Link>
						</li>
					</ul>
				</header>
				<main>
					<Form onSubmit={this.handleSubmit} className={'comment-form'}>
						<Form.Group controlId="formBasicText">
							<Form.Label>Username</Form.Label>
							<Form.Control
								disabled={true}
								value={this.props.user}
								type="text"
								placeholder={this.props.user}
								onChange={event =>
									this.handleChange('user', event.target.value)
								}
							/>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Comment</Form.Label>
							<Form.Control
								required
								as="textarea"
								rows="7"
								onChange={event =>
									this.handleChange('comment_body', event.target.value)
								}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check
								required
								type="checkbox"
								label="I confirm that my comment meets NC News"
							/>
							<Link to={'/t&cs'}> T&C's</Link>
						</Form.Group>
						<Button variant="outline-success" type="submit">
							Submit
						</Button>
					</Form>
				</main>
			</>
		);
	}
}

export default PostComment;
