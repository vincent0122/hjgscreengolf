import React, {useState} from "react";
import PlayerList from "../components/PlayerList";
import TodayPlayerList from "../components/TodayPlayer";
import {Link} from "react-router-dom";
import names from "./names";
import "./Home.css";

const Home = () => {
	const playerInfo = [];
	names.forEach((el) => {
		playerInfo.push({id: names.indexOf(el), playerName: el, handy: 0, score: 0, result: 0, active: false});
	});

	const [players, setPlayers] = useState(playerInfo);

	const onRemove = (id) => {
		// user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
		// = user.id 가 id 인 것을 제거함
		setPlayers(players.filter((player) => player.id !== id));
	};
	const onToggle = (id) => {
		setPlayers(players.map((player) => (player.id === id ? {...player, active: !player.active} : player)));
	};

	const onIncrease = (id) => {
		setPlayers(players.map((player) => (player.id === id ? {...player, handy: player.handy + 1} : player)));
	};
	const onDecrease = (id) => {
		setPlayers(players.map((player) => (player.id === id ? {...player, handy: player.handy - 1} : player)));
	};

	const setTodayPlayer = players.filter((player) => player.active === true);

	return (
		<>
			<div className="Member_list">
				<PlayerList players={players} onRemove={onRemove} onToggle={onToggle} />
				<TodayPlayerList players={setTodayPlayer} onIncrease={onIncrease} onDecrease={onDecrease} />
				<Link
					to={{
						pathname: "/Game",
						state: {setTodayPlayer},
					}}
				>
					<div className="button">입력완료</div>
				</Link>
			</div>
		</>
	);
};

export default Home;
