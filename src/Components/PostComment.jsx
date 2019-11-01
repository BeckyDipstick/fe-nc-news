import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

class PostComment extends React.Component {
	state = {
		username: '',
		comment_body: '',
		user: this.props.user,
		err: null
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
			})
			.catch(err => {
				this.setState({ err });
			});
	};
	render() {
		const id = this.props.article_id;
		const user = this.state.user;
		return (
			<>
				<header>
					<img
						src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
						alt="northcoders-logo"
						id="logo"
					></img>
					{user ? (
						<p>
							Welcome {user}!{' '}
							<span role="img" aria-label="party-popper">
								{' '}
								🎉{' '}
							</span>{' '}
						</p>
					) : null}
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
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formBasicText">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder={user}
								onChange={event =>
									this.handleChange('user', event.target.value)
								}
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
								label="I confirm that my comment meets NC News"
							/>
							<Link to={`/articles/${id}/comments/post_comment/t&cs`}>
								{' '}
								T&C's
							</Link>
						</Form.Group>
						<Button variant="outline-dark" type="submit">
							Submit
						</Button>
					</Form>
				</main>
			</>
		);
	}
}

export default PostComment;
