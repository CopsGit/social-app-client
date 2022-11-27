import Stories from "../components/stories/Stories"
import Posts from "../components/posts/Posts"
import Share from "../components/share/Share"
import "../style/home.scss"
import Layout from "./Layout";

const Home = () => {
    return (
        <Layout>
            <div className="home">
                <Stories/>
                <Share/>
                <Posts/>
            </div>
        </Layout>
    )
}

export default Home