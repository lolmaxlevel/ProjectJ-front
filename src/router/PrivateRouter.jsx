import {JwtManager} from "../service/JwtService.js";
import {Navigate} from "react-router-dom";


function PrivateRouter({children}) {
    let isLogged = JwtManager.userIsLoggedIn()
    if (isLogged) {
        return (
            children
        )
    } else {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
}

export default PrivateRouter;