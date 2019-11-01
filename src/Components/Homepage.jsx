import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import SingleArticle from './SingleArticle';

class Homepage extends React.Component {
	state = {
		topics: [],
		isLoading: true,
		user: this.props.user,
		errMsg: null,
		errStatus: null
	};
	componentDidMount() {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/topics')
			.then(({ data }) => {
				this.setState({ topics: data.topics, isLoading: false });
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	}
	handleLogin = event => {
		const user = event.target.innerText;
		this.setState({ user });
		this.props.getUser(user);
	};
	render() {
		const user = this.props.user;
		const article_id = Math.floor(Math.random() * 33 + 1);
		const topics = this.state.topics;
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
							Logged in as {user}!{' '}
							<span role="img" aria-label="party-popper">
								{' '}
								🎉{' '}
							</span>{' '}
						</p>
					) : null}
					<Dropdown id="dropdown">
						<Dropdown.Toggle
							variant="outline-success"
							id="dropdown-basic"
							size="sm"
							className="login"
						>
							Log In
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={this.handleLogin}>
								weegembump
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								happyamy2016
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								jessjelly
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>grumpy19</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								tickle122
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								cooljmessy
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					{user ? (
						<h1>Hi {user}! Welcome to NC News!</h1>
					) : (
						<h1>Welcome to NC News!</h1>
					)}
				</header>
				<main>
					<ul>
						{topics.map(topic => {
							return (
								<li key={topic.slug}>
									<Link
										to={`/topics/${topic.slug}/articles`}
										key={topic.slug}
										user={this.state.user}
										topic={topic.slug}
									>
										{topic.slug} articles
									</Link>
								</li>
							);
						})}
						<li key="articles">
							<Link to="/articles" user={this.state.user}>
								All articles
							</Link>
						</li>
					</ul>
					{user ? (
						<h2 className="feature">
							{user} here's an article you might like...
						</h2>
					) : (
						<h2>Here's an article you might like</h2>
					)}

					<SingleArticle article_id={article_id} />
				</main>
			</>
		);
	}
}

export default Homepage;
