import React from 'react';

function Loading(props) {
	const isLoading = props.isLoading;
	if (isLoading === true)
		return (
			<>
				<p>Loading....</p>
				<img
					src="https://ak2.picdn.net/shutterstock/videos/8646382/thumb/1.jpg"
					alt="loading"
				></img>
			</>
		);
}

export default Loading;
