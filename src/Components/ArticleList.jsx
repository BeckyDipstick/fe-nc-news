import React from 'react';
import { Card, Button, CardDeck, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import axios from 'axios';
import Voter from './Voter';

class ArticleList extends React.Component {
	state = {
		isLoading: true,
		articles: [],
		errMsg: null,
		errStatus: null,
		sortColumn: '',
		order: 'desc'
	};

	fetchArticles = () => {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/articles', {
				params: {
					topic: this.props.topic_slug,
					sort_by: this.state.sortColumn,
					order: this.state.order
				}
			})
			.then(({ data }) => {
				this.setState({
					articles: data.articles,
					isLoading: false
				});
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	};

	componentDidMount() {
		this.fetchArticles();
	}
	handleSort = event => {
		const sortColumn = event.target.innerText;
		this.setState({ sortColumn }, () => {
			this.fetchArticles();
		});
	};
	handleOrder = event => {
		const order = event.target.innerText;
		this.setState({ order }, () => {
			this.fetchArticles();
		});
	};
	render() {
		const user = this.props.user;
		if (this.state.isLoading)
			return (
				<>
					<p>Loading....</p>
					<img
						src="https://ak2.picdn.net/shutterstock/videos/8646382/thumb/1.jpg"
						alt="loading"
					></img>
				</>
			);
		const articles = this.state.articles;
		const topic = this.props.topic_slug;
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
					{topic ? <h1>{topic} Articles</h1> : <h1>All Articles</h1>}
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
					</ul>
				</header>
				<main>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							variant="outline-dark"
							id="dropdown-basic"
							size="sm"
						>
							Sort By
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={this.handleSort}>date</Dropdown.Item>
							<Dropdown.Item onClick={this.handleSort}>votes</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="dropdown">
						<Dropdown.Toggle
							variant="outline-dark"
							size="sm"
							id="dropdown-basic"
						>
							Sort Order
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={this.handleOrder}>asc</Dropdown.Item>
							<Dropdown.Item onClick={this.handleOrder}>desc</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
						<Card style={{ flex: 1 }}>
							{articles.map(article => {
								return (
									<Card.Body
										key={article.article_id}
										className={'article-cards'}
									>
										<Card.Title>{article.title}</Card.Title>
										<Card.Subtitle>By {article.author}</Card.Subtitle>
										<Card.Text>Article from {article.topic}</Card.Text>
										<Card.Text>
											Comment Count: {article.comment_count}
										</Card.Text>
										<Link
											to={`/articles/${article.article_id}`}
											user={this.state.user}
										>
											<Button variant="primary" size={'sm'}>
												See Full Article
											</Button>
										</Link>
										<Link
											to={`/articles/${article.article_id}/comments`}
											user={user}
										>
											<Button variant="primary" size={'sm'}>
												See Comments For Article
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
										<Voter
											id={article.article_id}
											votes={article.votes}
											path={`articles/${article.article_id}`}
										/>
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

export default ArticleList;
