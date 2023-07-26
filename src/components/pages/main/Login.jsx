import {ApplicationService} from "../../../service/ApplicationService.js";

function Login() {

    const login = () => {
        ApplicationService.login("aboba", "228").then(r => console.log(r))
    }
    const register = () => {
        ApplicationService.register("aboba", "228").then(r => console.log(r))
    }
return (
    <div>
        <h1>Register</h1>
        <p>Register to view protected pages</p>
        <button onClick={login}>login</button>
        <h1>Login</h1>
        <p>Log to view protected pages</p>
        <button onClick={register}>reg</button>
    </div>
)

}

export default Login;
