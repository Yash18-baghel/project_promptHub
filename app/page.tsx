import Feed from "@/components/Feed"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <div className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br />
                <span className="orange_gradient text-center">
                    AI-Powered Prompts
                </span>
            </h1>

            <p className='desc text-center'>
                PromptHub is an open-source AI prompting tool for modern world to
                discover, create and share creative prompts
            </p>
            <Feed />
            <ToastContainer />
        </div>
    )
}

export default Home