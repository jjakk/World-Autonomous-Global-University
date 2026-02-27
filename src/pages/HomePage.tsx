import { useEffect } from "react";
import "./HomePage.scss"
import ChatAgent from "../classes/ChatAgent";

function HomePage() {
    // useEffect(() => {
    //     (async function(){
    //         console.log(await ChatAgent.createCurriculum("Computer Science"));
    //     })();
    // }, []);

    return (
        <div className="home-page">
            <h1>Welcome to World Autonomous Global University!</h1>
            <p>Your personalized AI-powered education experience starts here.</p>
        </div>
    );
};

export default HomePage;