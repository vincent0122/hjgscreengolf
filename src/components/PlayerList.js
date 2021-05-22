import "./Player.css";

const Player = ({player, onRemove, onToggle}) => {
	return (
		<>
			<div>
				<b
					style={{
						cursor: "pointer",
						color: player.active ? "blue" : "black",
					}}
					onClick={() => onToggle(player.id)}
				>
					<b className="Player">{player.playerName}</b>
				</b>
			</div>
		</>
	);
};

const PlayerList = ({players, onRemove, onToggle}) => {
	return (
		<div className="PlayerList">
			{players.map((player) => (
				<Player player={player} key={player.id} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default PlayerList;
