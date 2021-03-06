import React from 'react';
import { Link } from '@reach/router';
import { Jumbotron } from 'react-bootstrap';

function Terms(props) {
	const id = props.article_id;
	return (
		<Jumbotron id="jumbo">
			<>
				<header>
					<h1>How to lose friends and alienate people</h1>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/articles">Articles</Link>
						</li>
						<li>
							<Link to={`/articles/${id}/comments/post_comment`}>
								{' '}
								Back to Post
							</Link>
						</li>
					</ul>
				</header>
				<main className="terms">
					<p>
						1. No posting hate speech!! The ban hammer{' '}
						<span role="img" aria-label="hammer">
							🔨{' '}
						</span>{' '}
						will be swung with extreme force and impeccable precision upon you!!
						Be sure not to let the door hit you on the way out!{' '}
					</p>
					<p>
						2. No spamming{' '}
						<span role="img" aria-label="spam-taco">
							🌮{' '}
						</span>{' '}
						!! We are not fritters!!
					</p>
					<p>
						{' '}
						3. No illegal activity! If you post links to illegal downloads, ways
						to steal services, describe how to loophole the system, or any other
						nefarious activity the ban hammer{' '}
						<span role="img" aria-label="hammer">
							🔨{' '}
						</span>{' '}
						will be swung!
					</p>
					<p>
						{' '}
						4. No trolling!{' '}
						<span role="img" aria-label="microphone">
							🎤{' '}
						</span>{' '}
						I see you trollin', I bannin'{' '}
						<span role="img" aria-label="hammer">
							{' '}
							🔨{' '}
						</span>{' '}
					</p>
					<p>
						<span role="img" aria-label="unicorn">
							5. 🦄{' '}
						</span>{' '}
						Most importantly, be wonderful to each other and have fun!{' '}
						<span role="img" aria-label="unicorn">
							🦄{' '}
						</span>{' '}
					</p>
					<img
						src="https://i.pinimg.com/originals/71/88/c1/7188c1bb78f4f3e28f8c34c19dc59a7b.jpg"
						alt="corgi-chasing-bubble"
						id="corgi"
					></img>
				</main>
			</>
		</Jumbotron>
	);
}

export default Terms;
