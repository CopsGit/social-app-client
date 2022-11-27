import "../../style/rightBar.scss";
import Suggestions from "./conponents/Suggestions";
import Activities from "./conponents/Activities";
import OnlineFriends from "./conponents/OnlineFriends";

const RightBar = () => {


    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <Suggestions/>
                </div>
                <div className="item">
                    <Activities/>
                </div>
                <div className="item">
                    <OnlineFriends/>
                </div>
            </div>
        </div>
    );
};

export default RightBar;
