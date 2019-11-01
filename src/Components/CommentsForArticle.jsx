import React from 'react';
import axios from 'axios';
import { Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';
import NotFound from './NotFound';

class CommentsForArticle extends React.Component {
	state = {
		comments: [],
		isLoading: true,
		errMsg: null,
		errStatus: null
	};
	componentDidMount() {
		return axios
			.get(
				`https://rebecca-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`
			)
			.then(({ data }) => {
				this.setState({ comments: data.comments, isLoading: false });
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	}
	handleDelete = (id, author) => {
		const comments = this.state.comments;
		const filteredComments = comments.filter(
			comment => comment.comment_id !== id
		);
		const user = this.props.user;
		if (user === author) {
			return axios
				.delete(`https://rebecca-nc-news.herokuapp.com/api/comments/${id}`)
				.then(() => {
					this.setState({ comments: filteredComments });
				});
		}
	};

	render() {
		const status = this.state.errStatus;
		if (status) return <NotFound />;
		const user = this.props.user;
		const id = this.props.article_id;
		if (this.state.isLoading) return <p>Loading....</p>;
		const comments = this.state.comments;
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
					<h1>Comments for (need the article title to live here)</h1>
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
							<Link
								to={`/articles/${id}/comments/post_comment`}
								user={this.state.user}
							>
								Post a comment
							</Link>
						</li>
					</ul>
				</header>
				<main>
					<CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
						<Card style={{ flex: 1 }}>
							{comments.map(comment => {
								return (
									<Card.Body
										key={comment.comment_id}
										className={'article-cards'}
									>
										<Card.Title>{comment.author}</Card.Title>
										<Card.Subtitle>
											For article {this.props.title}
										</Card.Subtitle>
										<Card.Text>{comment.body}</Card.Text>
										<Voter
											id={comment.comment_id}
											votes={comment.votes}
											path={`comments/${comment.comment_id}`}
										/>
										<Button
											variant="danger"
											size={'sm'}
											onClick={() =>
												this.handleDelete(comment.comment_id, comment.author)
											}
										>
											Delete
										</Button>
									</Card.Body>
								);
							})}
						</Card>
					</CardDeck>
				</main>
			</>
		);
	}
}

export default CommentsForArticle;
