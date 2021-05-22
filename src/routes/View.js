import firebase from "firebase/app";
import React from "react";
import {useCollection} from "react-firebase-hooks/firestore";

const timezoneOffset = new Date().getTimezoneOffset() * 60000;
const timezoneDate = new Date(Date.now() - timezoneOffset);
const st_date = timezoneDate.toISOString().substr(0, 10).replace("T", " ");

const ViewGameResult = ({id, playerName, handy, score, result}) => {
	return (
		<div className="titleTable">
			<th>{playerName.replace(/"/gi, "")}</th>
			<th>{handy}</th>
			<th>{score}</th>
			<th>{result}</th>
		</div>
	);
};

const View = () => {
	const [value, loading, error] = useCollection(firebase.firestore().collection(st_date), {
		snapshotListenOptions: {includeMetadataChanges: true},
	});

	return (
		<div>
			<p>
				{error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <span>Collection: Loading...</span>}

				{value && (
					<span>
						<div className="titleTable">
							<th>Name</th>
							<th>Handy</th>
							<th>Score</th>
							<th>Result</th>
						</div>
						{value.docs.map((doc) => (
							<ViewGameResult
								key={JSON.stringify(doc.data().id)}
								playerName={JSON.stringify(doc.data().playerName)}
								handy={JSON.stringify(doc.data().handy)}
								score={JSON.stringify(doc.data().score)}
								result={JSON.stringify(doc.data().result)}
							/>
						))}
					</span>
				)}
			</p>
		</div>
	);
};

export default View;
