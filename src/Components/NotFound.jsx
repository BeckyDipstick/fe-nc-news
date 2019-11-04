import React from 'react';
import { Link } from '@reach/router';

function NotFound() {
	return (
		<main className="errors">
			<ul>
				<li>
					<Link to="/">Back to Safety!</Link>
				</li>
			</ul>
			<h1>
				oopsy daisy you've made a boo boo if you've found yourself here....
			</h1>
			<img
				src="https://www.tynker.com/projects/screenshot/5abba72e949b56cd5b8b458b/derp-face.png"
				alt="oopsy"
				id="oopsy"
			></img>
		</main>
	);
}

export default NotFound;
