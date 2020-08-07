import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logoMain from "../../img/stethoscope.svg";
import logoMod1 from "../../img/personal-information.svg";
import logoMod2 from "../../img/hospital-bed.svg";
import logoMod3 from "../../img/medical-records.svg";
import picture1 from "../../img/users/ACD.jfif";
// import picture2 from "../../img/users/LGB.jfif";
import picture3 from "../../img/users/JYM.jfif";
import logoUR from "../../img/UR-LOGO.png";
import icon1 from "../../img/individual.svg";
import icon2 from "../../img/pharmacy.svg";
import icon3 from "../../img/pills.svg";
import icon4 from "../../img/more.svg";
import { useSelector, useDispatch, connect } from "react-redux";
import news from "../../img/UR-LOGO.png";
//   constructor(props) {
//     super(props);
//     this.state = { username: this.props.user, photoLoc: "" };
//   }

//   render() {
//     const loadImage = () => {
//       if (this.state.username === "Alberto") {
//         return (
//           <div className="home__photo">
//             <img className="user__photo" src={picture1}></img>
//           </div>
//         );
//       } else if (this.state.username === "Lizbeth") {
//         return (
//           <div className="home__photo">
//             <img className="user__photo" src={picture1}></img>
//           </div>
//         );
//       } else if (this.state.username === "Jorge") {
//         return (
//           <div className="home__photo">
//             <img className="user__photo" src={picture3}></img>
//           </div>
//         );
//       } else {
//         return (
//           <div className="home__photo">
//             <img className="user__photo" src={logoUR}></img>
//           </div>
//         );
//       }
//     };

//   const username = useSelector((state) => state.inputText.loginUsername);

//   const loadImage = () => {
//     if (username == "Alberto") {
//       return (
//         <div className="home__photo">
//           <img className="user__photo" src={picture1}></img>
//         </div>
//       );
//     } else if (username === "Jorge") {
//       return (
//         <div className="home__photo">
//           <img className="user__photo" src={picture3}></img>
//         </div>
//       );
//     } else {
//       return (
//         <div className="home__photo">
//           <img className="user__photo" src={logoUR}></img>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="home__container">
//       {loadImage()}

//       <div className="home__greeting">
//         Bienvenido(a) {username} al app de control Colaborador Covid
//       </div>

//       <div className="home__stats--1">
//         <h3>
//           A la fecha, la empresa presenta: 10 colaboradores infectados con
//           COVID-19.
//         </h3>
//       </div>
//       <div className="home__stats--2">
//         <h3>Ellos están distribuidos de la siguiente manera:</h3>
//         <ul className="stats__list--1">
//           <li>Aislamiento en U.M: 2</li>
//           <li>Aislamiento en Casa: 1</li>
//           <li>Aislamiento en Hotel: 1</li>
//           <li>Hospitalización: 3</li>
//           <li>Recuperados: 3</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Home;
const mapStateToProps = (state) => ({
  loginUsername: state.inputText.loginUsername,
  workerList: state.storeData.workerList,
});

class Home extends Component {
  render() {
    const setStyle = () => {
      if (!document.getElementById("navlink-1")) {
      } else {
        const navs = document.getElementsByClassName("navlink");
        for (let i = 0; i < navs.length; i++) {
          navs[i].style.color = "#214f88";
          navs[i].style.backgroundColor = "transparent";
          navs[i].querySelector("object").style.filter =
            "invert(21%) sepia(82%) saturate(1130%) hue-rotate(189deg) brightness(94%) contrast(86%)";
          navs[i].querySelector("h3").style.color = "#214f88";
        }
        const nav = document.getElementById("navlink-1");
        nav.style.color = "#FFFFFF";
        nav.style.backgroundColor = "#214f88";
        const obj = nav.querySelector("object");
        const text = nav.querySelector("h3");
        obj.style.filter =
          "invert(100%) sepia(70%) saturate(0%) hue-rotate(322deg) brightness(112%) contrast(101%)";
        text.style.color = "white";

        const navBar = document.getElementsByClassName("header__list")[0];
        const menuLinks = navBar.querySelectorAll("li");
        for (let i = 0; i < menuLinks.length; i++) {
          menuLinks[i].querySelector("a").style.textDecoration = "none";
        }
        menuLinks[0].querySelector("a").style.textDecoration = "underline";
      }
    };
    setStyle();
    const loadImage = () => {
      if (this.props.loginUsername == "Alberto") {
        return (
          <div className="home__photo">
            <img className="user__photo" src={picture1}></img>
          </div>
        );
      } else if (this.props.loginUsername === "Jorge") {
        return (
          <div className="home__photo">
            <img className="user__photo" src={picture3}></img>
          </div>
        );
      } else {
        return (
          <div className="home__photo">
            <img className="user__photo" src={logoUR}></img>
          </div>
        );
      }
    };
    const toggleCard = (event) => {
      const item = event.target;
      item.classList.toggle("list--active");
    };

    return (
      <div className="home__container">
        <div className="home__greeting">
          {loadImage()}
          <h4>
            Bienvenido(a) {this.props.loginUsername} al app de control
            Colaborador Covid
          </h4>
        </div>
        {/* <div className="news__container">
          <div className="news__title">
            <h3>Entérate de las últimas noticias en URBSSS</h3>
          </div>
          <div className="box__container">
            <div className="news__box">
              <div className="box__image">
                <img src={news}></img>
              </div>
              <div className="box__text">
                <div className="box__title">
                  <h4>Noticia 1</h4>
                </div>
                <div className="box__body">
                  <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="home__stats--1">
          <h3>
            Estado actual: {this.props.workerList.length} colaboradores
            infectados con COVID-19.
          </h3>
        </div>
        <div className="home__stats--2">
          <div className="list--item list--aislamiento" onClick={toggleCard}>
            <div className="list--front">
              <h3>Aislamiento: 3</h3>
              <div className="list--icon">
                <object
                  type="image/svg+xml"
                  data={icon1}
                  className="icon"
                ></object>
              </div>
            </div>
            <div className="list--back">
              <div className="list--text">
                <li>En U.M: 1</li>
                <li>En casa: 1</li>
                <li>En hotel: 1</li>
              </div>
            </div>
          </div>
          <div className="list--item list--aislamiento" onClick={toggleCard}>
            <div className="list--front">
              <h3>Hospitalización: 3</h3>
              <div className="list--icon">
                <object
                  type="image/svg+xml"
                  data={icon2}
                  className="icon"
                ></object>
              </div>
            </div>
            <div className="list--back">
              <div className="list--text">
                <li>UCI: 1</li>
                <li>Respirador: 2</li>
              </div>
            </div>
          </div>
          <div className="list--item list--aislamiento" onClick={toggleCard}>
            <div className="list--front">
              <h3>En alta: 2</h3>
              <div className="list--icon">
                <object
                  type="image/svg+xml"
                  data={icon3}
                  className="icon"
                ></object>
              </div>
            </div>
            <div className="list--back">
              <div className="list--text">
                <li>Médica: 1</li>
                <li>Epidemiológica: 2</li>
              </div>
            </div>
          </div>
          <div className="list--item list--aislamiento" onClick={toggleCard}>
            <div className="list--front">
              <h3>Otros: 2</h3>
              <div className="list--icon">
                <object
                  type="image/svg+xml"
                  data={icon4}
                  className="icon"
                ></object>
              </div>
            </div>
            <div className="list--back">
              <div className="list--text">
                <li>Fallecidos: 2</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home = connect(mapStateToProps)(Home);
export default Home;
