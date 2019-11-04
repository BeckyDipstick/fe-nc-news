import React from 'react';

function Header(props) {
	const user = props.user;
	return (
		<>
			<img
				src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
				alt="northcoders-logo"
				id="logo"
			></img>
			<header>
				{user ? (
					<h1>Hi {user}! Welcome to NC News!</h1>
				) : (
					<h1>Welcome to NC News!</h1>
				)}
			</header>
		</>
	);
}

export default Header;
