import React, { Component } from "react";
import Logo from "../../img/URBSSS-LOGO-2.png";
import workerList from "../Resources/Workers";
import { useDispatch } from "react-redux";
import { logUser, storeData, inputText } from "../../Redux/Actions";
import "./Login.css";
// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { username: "" };
//     this.textboxChange = this.textboxChange.bind(this);
//   }

//   loginHandle = () => {
//     var username = this.state.username;
//     this.props.handler(username);
//   };

//   textboxChange(event) {
//     this.setState({ username: event.target.value });
//   }
//   render() {
//     return (
//       <div className="login__container">
//         <div className="logo__container">
//           <img src={Logo}></img>
//         </div>
//         <form className="login__form">
//           <div className="login--user">
//             <i className="fa fa-user" aria-hidden="true"></i>
//             <input
//               type="text"
//               placeholder="Usuario"
//               onChange={this.textboxChange}
//             ></input>
//           </div>
//           <div className="login--password">
//             <i className="fa fa-lock" aria-hidden="true"></i>
//             <input type="text" placeholder="Contraseña"></input>
//           </div>
//           <button onClick={this.loginHandle}>Ingresar</button>
//         </form>
//       </div>
//     );
//   }
// }

function Login() {
  const dispatch = useDispatch();
  const textHandler = (event) => {
    dispatch(inputText(event.target.name, event.target.value));
  };

  const logIn = () => {
    dispatch(storeData(workerList, "workerList"));
    dispatch(logUser());
  };

  return (
    <div className="login__container">
      <div className="logo__container">
        <img src={Logo}></img>
      </div>
      <form className="login__form">
        <div className="login--user">
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            name="loginUsername"
            placeholder="Usuario"
            onChange={textHandler}
          ></input>
        </div>
        <div className="login--password">
          <i className="fa fa-lock" aria-hidden="true"></i>
          <input
            type="text"
            name="loginPassword"
            placeholder="Contraseña"
            onChange={textHandler}
          ></input>
        </div>
        <button onClick={logIn}>Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
