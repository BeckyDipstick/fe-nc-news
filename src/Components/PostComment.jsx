import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

class PostComment extends React.Component {
	state = {
		username: '',
		comment_body: '',
		user: this.props.user
	};
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};
	handleSubmit = event => {
		event.preventDefault();
		// const { username, comment_body } = this.state;
		return axios
			.post(
				`https://rebecca-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`,
				{
					username: this.state.user,
					body: this.state.comment_body
				}
			)
			.then(({ data }) => {
				return data.comment;
			})
			.then(() => {
				navigate(`/articles/${this.props.article_id}/comments`);
			});
	};
	render() {
		const id = this.props.article_id;
		const user = this.state.user;
		return (
			<main>
				<h1>We can hopefully post a comment here...</h1>
				<nav>
					<Link to="/" user={this.state.user}>
						Home
					</Link>
					<Link to="/articles" user={this.state.user}>
						Articles
					</Link>
					<Link to={`/articles/${id}`} user={this.state.user}>
						Back to article
					</Link>
					<Link to={`/articles/${id}/comments`} user={this.state.user}>
						Article Comments
					</Link>
				</nav>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="formBasicText">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder={user}
							onChange={event => this.handleChange('user', event.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Comment</Form.Label>
						<Form.Control
							as="textarea"
							rows="7"
							onChange={event =>
								this.handleChange('comment_body', event.target.value)
							}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check
							type="checkbox"
							label="I confirm that my comment meets NC News T&C's"
						/>
					</Form.Group>
					<Button variant="outline-dark" type="submit">
						Submit
					</Button>
				</Form>
			</main>
		);
	}
}

export default PostComment;
