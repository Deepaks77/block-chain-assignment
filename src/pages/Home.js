import React from "react";
import { BlockTable } from "../components/block";

const Home = ({ history, blocks }) => {
	return (
		<div>
			<p className="text-center h4">Block Chain Table</p>
			<BlockTable blocks={blocks} history={history} />
		</div>
	);
};

export default Home;
