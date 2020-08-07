import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Search from "./Components/Search/Search";
import Activity from "./Components/Activity/Activity";
import Patients from "./Components/Patients/Patients";
import { useSelector, connect } from "react-redux";

import "./Main.css";
// class Main extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isLoggedIn: false,
//       username: "",
//       photoLoc: "",
//     };
//     this.Log = this.Log.bind(this);
//     this.validateLogin = this.validateLogin.bind(this);
//   }

//   validateLogin = (name) => {
//     this.setState({ username: name });
//     this.setState({ isLoggedIn: true });
//   };

//   Log() {
//     if (this.state.isLoggedIn) {
//       return (
//         <HashRouter>
//           <div>
//             <Header></Header>
//             <div className="content">
//               <Route
//                 exact
//                 path="/"
//                 render={(props) => (
//                   <Home
//                     {...props}
//                     user={this.state.username}
//                     photo={this.state.photoLoc}
//                   />
//                 )}
//               />
//               <Route path="/patients" component={Patients} />
//               <Route path="/activity" component={Activity} />
//               <Route path="/search" component={Search} />
//             </div>
//             <Footer></Footer>
//           </div>
//         </HashRouter>
//       );
//     }
//     return <Login handler={this.validateLogin} />;
//   }
//   render() {
//     return <div>{this.Log()}</div>;
//   }
// }

// function Main() {
//   const logStatus = useSelector((state) => state.isLogged);

//   if (logStatus) {
//     return (
//       <HashRouter>
//         <div>
//           <Header></Header>
//           <div className="content">
//             <Route
//               exact
//               path="/"
//               render={(props) => (
//                 <Home
//                 // {...props}
//                 // user={this.state.username}
//                 // photo={this.state.photoLoc}
//                 />
//               )}
//             />
//             <Route
//               path="/patients"
//               render={(...props) => (
//                 <Patients {...props} handler={console.log(221)} />
//               )}
//             />
//             <Route path="/activity" component={Activity} />
//             <Route path="/search" component={Search} />
//           </div>
//           <Footer></Footer>
//         </div>
//       </HashRouter>
//     );
//   } else {
//     return <Login />;
//   }
// }
// export default Main;
// const logStatus = useSelector((state) => state.isLogged);
const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
});

class Main extends Component {
  render() {
    if (this.props.isLogged) {
      return (
        <HashRouter>
          <div>
            <Header></Header>
            <div className="content" id="body">
              <div className="bg"></div>
              <Route exact path="/" component={Home} />
              <Route path="/patients" component={Patients} />
              <Route path="/activity" component={Activity} />
              <Route path="/search" component={Search} />
            </div>
            <Footer></Footer>
          </div>
        </HashRouter>
      );
    } else {
      return <Login />;
    }
  }
}

Main = connect(mapStateToProps)(Main);
export default Main;
