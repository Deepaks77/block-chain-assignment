import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Ether } from "./utils";

//Pages
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";

//components
import Nav from "./components/nav/Nav";

//Global Const
const MIN_ENTRIES = 10;

const App = () => {
	const [blocksData, setBlocksData] = useState([]);
	useEffect(() => {
		const provider = Ether.provider;
		provider.on("block", (blockNumber) => {
			// console.log("Block Number", blockNumber);
			provider
				.getBlock(blockNumber)
				.then(({ number, hash, timestamp, gasUsed: { _hex } }) => {
					setBlocksData((currentState) => {
						const formattedBlockObj = {
							number,
							hash,
							timestamp: new Date(
								timestamp * 1000
							).toLocaleString("en-IN", {
								dateStyle: "medium",
								timeStyle: "medium",
								hour12: false,
							}),
							_hex: parseInt(_hex, 16),
						};
						if (currentState.length > MIN_ENTRIES - 1) {
							let removedLastElementArr = currentState.slice(
								0,
								MIN_ENTRIES - 1
							);
							return [
								...removedLastElementArr,
								{
									...formattedBlockObj,
								},
							];
						} else
							return [
								...currentState,
								{
									...formattedBlockObj,
								},
							];
					});
				})
				.catch((err) => {
					console.log("Error in getting block", err);
				});
		});

		return () => provider.removeAllListeners();
		// eslint-disable-next-line
	}, []);
	return (
		<div className="container-fluid p-4">
			<Nav />
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => <Home {...props} blocks={blocksData} />}
				/>
				<Route
					exact
					path="/transactions/:blockId"
					component={Transaction}
				/>
			</Switch>
		</div>
	);
};

export default App;
