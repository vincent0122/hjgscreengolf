import {Link} from "react-router-dom";
import "./Navigation.css";

function Navigation() {
	return (
		<ul className="nav">
			<li>
				<Link to="/">참가자 세팅</Link>
			</li>
			<li>
				<Link to="/Game">타수입력</Link>
			</li>
			{/* <li>
				<Link to="/View" replace>
					등수확인
				</Link>
			</li> */}
		</ul>
	);
}

export default Navigation;
