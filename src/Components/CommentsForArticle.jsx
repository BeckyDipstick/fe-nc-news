import React from 'react';
import { Link } from '@reach/router';
import ErrorHandler from './ErrorHandler';
import Loading from './Loading';
import * as api from '../api';
import CommentCards from './CommentCards';

class CommentsForArticle extends React.Component {
	state = {
		comments: [],
		isLoading: true,
		errMsg: null,
		errStatus: null
	};
	componentDidMount() {
		const article_id = this.props.article_id;
		api
			.fetchComments(article_id)
			.then(comments => {
				this.setState({ comments, isLoading: false });
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
			api.deleteComment(id).then(() => {
				this.setState({ comments: filteredComments });
			});
		}
	};
	render() {
		const { errStatus, errMsg } = this.state;
		if (errStatus)
			return <ErrorHandler errMsg={errMsg} errStatus={errStatus} />;
		const user = this.props.user;
		const id = this.props.article_id;
		if (this.state.isLoading)
			return <Loading isLoading={this.state.isLoading} />;
		const comments = this.state.comments;
		return (
			<>
				<header>
					<h1>Comments</h1>
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
						{user ? (
							<li>
								<Link
									to={`/articles/${id}/comments/post_comment`}
									user={this.state.user}
								>
									Post a comment
								</Link>
							</li>
						) : null}
					</ul>
				</header>
				<main>
					<CommentCards
						comments={comments}
						user={user}
						id={id}
						handleDelete={this.handleDelete}
					/>
				</main>
			</>
		);
	}
}

export default CommentsForArticle;
