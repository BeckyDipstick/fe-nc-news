import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';
import ErrorHandler from './ErrorHandler';
import Loading from './Loading';
import * as api from '../api';
import formatDate from '../utils';

class SingleArticle extends React.Component {
	state = {
		article: {},
		isLoading: true,
		errStatus: null,
		errMsg: null
	};
	componentDidMount() {
		const article_id = this.props.article_id;
		api
			.fetchSingleArticle(article_id)
			.then(article => {
				this.setState({ article, isLoading: false });
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	}
	render() {
		const { errMsg, errStatus } = this.state;
		if (errStatus)
			return <ErrorHandler errMsg={errMsg} errStatus={errStatus} />;
		const user = this.props.user;
		if (this.state.isLoading)
			return <Loading isLoading={this.state.isLoading} />;
		const article = this.state.article;
		return (
			<>
				<header>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/articles">Articles</Link>
						</li>
					</ul>
				</header>
				<main className={'featured-article'}>
					<h2>{article.title}</h2>
					<h3>By {article.author}</h3>
					<h4>From topic {article.topic}</h4>
					<p>{article.body}</p>
					<Voter
						path={`articles/${article.article_id}`}
						votes={article.votes}
					/>
					<Link to={`/articles/${article.article_id}/comments`} user={user}>
						<Button
							variant="outline-primary"
							size={'sm'}
							className={'comment-buttons'}
						>
							Comments
						</Button>
					</Link>
					<Link
						to={`/articles/${article.article_id}/comments/post_comment`}
						user={user}
					>
						{user ? (
							<Button
								variant="outline-primary"
								size={'sm'}
								className={'comment-buttons'}
							>
								Post Comment
							</Button>
						) : null}
					</Link>
					<p className="date">Written on {formatDate(article.created_at)}</p>
				</main>
			</>
		);
	}
}

export default SingleArticle;
