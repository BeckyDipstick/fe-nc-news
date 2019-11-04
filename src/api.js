import axios from 'axios';

export const fetchTopics = () => {
	return axios
		.get('https://rebecca-nc-news.herokuapp.com/api/topics')
		.then(({ data }) => {
			return data.topics;
		});
};

export const fetchComments = article_id => {
	return axios
		.get(
			`https://rebecca-nc-news.herokuapp.com/api/articles/${article_id}/comments`
		)
		.then(({ data }) => {
			return data.comments;
		});
};

export const fetchSingleArticle = article_id => {
	return axios
		.get(`https://rebecca-nc-news.herokuapp.com/api/articles/${article_id}`)
		.then(({ data }) => {
			return data.article;
		});
};

export const postComment = (article_id, username, comment_body) => {
	return axios
		.post(
			`https://rebecca-nc-news.herokuapp.com/api/articles/${article_id}/comments`,
			{
				username,
				body: comment_body
			}
		)
		.then(({ data }) => {
			return data.comment;
		});
};

export const deleteComment = id => {
	return axios.delete(
		`https://rebecca-nc-news.herokuapp.com/api/comments/${id}`
	);
};

export const patchVote = (direction, path) => {
	return axios.patch(`https://rebecca-nc-news.herokuapp.com/api/${path}`, {
		inc_votes: direction
	});
};

export const getArticles = (sortColumn, order = 'desc', topic_slug) => {
	return axios
		.get('https://rebecca-nc-news.herokuapp.com/api/articles', {
			params: {
				topic: topic_slug,
				sort_by: sortColumn,
				order
			}
		})
		.then(({ data }) => {
			return data.articles;
		});
};
