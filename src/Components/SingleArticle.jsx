import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';

class SingleArticle extends React.Component {
	state = {
		article: {},
		isLoading: true,
		errStatus: null,
		errMsg: null
	};
	componentDidMount() {
		return axios
			.get(
				`https://rebecca-nc-news.herokuapp.com/api/articles/${this.props.article_id}`
			)
			.then(({ data }) => {
				this.setState({ article: data.article, isLoading: false });
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
		if (errStatus === 404)
			return (
				<>
					<ul>
						<li>
							<Link to="/">Back to Safety</Link>
						</li>
					</ul>
					<h1>Oopsy Daisy you can has a {errStatus}</h1>
					<h2>{errMsg}</h2>
					<img src="https://httpstatusdogs.com/img/404.jpg" alt="404 dog"></img>
				</>
			);
		if (errStatus === 400)
			return (
				<>
					<ul>
						<li>
							<Link to="/">Back to Safety</Link>
						</li>
					</ul>
					<h1>Oopsy Daisy you can has a {errStatus}</h1>
					<h2>{errMsg}</h2>
					<img src="https://httpstatusdogs.com/img/400.jpg" alt="400 dog"></img>
				</>
			);
		const user = this.props.user;
		if (this.state.isLoading) return <p>Loading....</p>;
		const article = this.state.article;
		return (
			<>
				<header>
					{user ? (
						<p>
							Welcome {user}!{' '}
							<span role="img" aria-label="party-popper">
								{' '}
								🎉{' '}
							</span>{' '}
						</p>
					) : null}
					<h2>{article.title}</h2>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/articles">Articles</Link>
						</li>
					</ul>
				</header>
				<main>
					<h3>By {article.author}</h3>
					<h4>From topic {article.topic}</h4>
					<p>{article.body}</p>
					<Voter
						path={`articles/${article.article_id}`}
						votes={article.votes}
					/>
					<Link to={`/articles/${article.article_id}/comments`} user={user}>
						<Button variant="outline-primary" size={'sm'}>
							Comments
						</Button>
					</Link>
					<Link
						to={`/articles/${article.article_id}/comments/post_comment`}
						user={user}
					>
						<Button variant="outline-primary" size={'sm'}>
							Post Comment
						</Button>
					</Link>
				</main>
			</>
		);
	}
}

export default SingleArticle;
