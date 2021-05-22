import React, {useState, useEffect} from "react";
import "../components/Player.css";
import "./Home.css";
import firebase from "firebase/app";
import key from "./firebase";
import "firebase/firestore";
import dotenv from "dotenv";
import {useCollection} from "react-firebase-hooks/firestore";
dotenv.config();

const db = firebase.firestore();
const timezoneOffset = new Date().getTimezoneOffset() * 60000;
const timezoneDate = new Date(Date.now() - timezoneOffset);
const st_date = timezoneDate.toISOString().substr(0, 10).replace("T", " ");

const ViewGameResult = ({id, playerName, handy, score, result, onIncreaseScore, onDecreaseScore}) => {
	return (
		<div className="titleTable">
			<th>{playerName.replace(/"/gi, "")}</th>
			<th>{handy}</th>
			<th>{score}</th>
			<th>{result}</th>
		</div>
	);
};

const ShowRanking = ({onIncreaseScore, onDecreaseScore}) => {
	const [value, loading, error] = useCollection(firebase.firestore().collection(st_date), {
		snapshotListenOptions: {includeMetadataChanges: true},
	});

	var gotData = [];
	//value를 기다렸다가 작동되는 걸 만들어야 함. 시간의 문제가 아니네
	if (value) {
		value.docs.map((doc) => gotData.push(doc.data()));
		gotData.sort(({result: a}, {result: b}) => a - b);
		console.log(gotData);
	}

	return (
		<div>
			<p>
				{error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <span>Collection: Loading...</span>}

				{value && (
					<div>
						<div className="titleTable">
							<th>Name</th>
							<th>Handy</th>
							<th>Score</th>
							<th>Result</th>
						</div>
						<span>
							{gotData.map((doc) => (
								<ViewGameResult
									key={doc.id}
									handy={doc.handy}
									score={doc.score}
									playerName={doc.playerName}
									result={doc.result}
								/>
							))}
						</span>
					</div>
				)}
			</p>
		</div>
	);
};

const ResultPlayers = ({id, playerName, handy, score, onIncreaseScore, onDecreaseScore, history}) => {
	return (
		<div className="titleTable">
			<th>{playerName}</th>
			<th>
				<button onClick={() => onIncreaseScore(id)}>+1</button>
			</th>
			<th>
				<button onClick={() => onDecreaseScore(id)}>-1</button>
			</th>
		</div>
	);
};

const Game = (props) => {
	const {location, history} = props;

	if (location.state === undefined) {
		history.push("/");
	}

	const players = location.state.setTodayPlayer; // 이걸 database에서 받아와야 된다. 그래야 다른 사람들도 볼 수 있다. 참가인원 초기화 이후, local에서 가져올 데이터는 없는거지.
	const [todayPlayers, setTodayPlayers] = useState(players);

	useEffect(() => {
		todayPlayers.forEach((el) => {
			db.collection(st_date)
				.doc(el.playerName)
				.set({
					id: el.id,
					handy: el.handy,
					score: el.score,
					playerName: el.playerName,
					result: el.score - el.handy,
				})
				.then(() => {
					console.log("Document successfully written!");
				})
				.catch((error) => {
					console.error("Error writing document: ", error);
				});
		});
	});

	const onIncreaseScore = (id) => {
		setTodayPlayers(todayPlayers.map((player) => (player.id === id ? {...player, score: player.score + 1} : player)));
	};
	const onDecreaseScore = (id) => {
		setTodayPlayers(todayPlayers.map((player) => (player.id === id ? {...player, score: player.score - 1} : player)));
	};

	return (
		<>
			<div>
				{todayPlayers.map((player) => (
					<ResultPlayers
						key={player.id}
						id={player.id}
						playerName={player.playerName}
						history={history}
						active={player.active}
						onIncreaseScore={onIncreaseScore}
						onDecreaseScore={onDecreaseScore}
					/>
				))}
			</div>
			<div>
				<ShowRanking todayPlayers={todayPlayers} onIncreaseScore={onIncreaseScore} onDecreaseScore={onDecreaseScore} />
			</div>
		</>
	);
};

export default Game;
