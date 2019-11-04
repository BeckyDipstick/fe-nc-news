import React from 'react';
import { Link } from '@reach/router';
import SingleArticle from './SingleArticle';
import Loading from './Loading';
import * as api from '../api';

class Homepage extends React.Component {
	state = {
		topics: [],
		isLoading: true,
		user: this.props.user,
		errMsg: null,
		errStatus: null
	};
	componentDidMount() {
		api
			.fetchTopics()
			.then(topics => {
				this.setState({ topics, isLoading: false });
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status
				});
			});
	}
	render() {
		const article_id = Math.floor(Math.random() * 33 + 1);
		const topics = this.state.topics;
		if (this.state.isLoading)
			return <Loading isLoading={this.state.isLoading} />;
		return (
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
				<SingleArticle article_id={article_id} user={this.props.user} />
			</main>
		);
	}
}

export default Homepage;
