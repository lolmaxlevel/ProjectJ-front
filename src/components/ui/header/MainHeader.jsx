import {useNavigate} from 'react-router-dom';

function MainHeader() {
    const navigate = useNavigate();
    return (
        <header style={{position: "fixed"}}>
            <h1 onClick={() => navigate(-1)}>A Typical Page</h1>
        </header>
    );
}


export default MainHeader;