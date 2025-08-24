import "./Home.css";
import { CakeCategories } from "../components/CakeCategories";
import  jacquin  from "../assets/jacquin.png";


export const Home = () => {

  return (

    <div className="container mainContainer">
      <div style={{ alignSelf: "center", width: "100%" }}>
        <h1 className="titulo">Bolos do Jacquin</h1>
        <img className="jacquinImg" src={jacquin} alt="" />
      </div>
      <CakeCategories />
    </div>
  );
};
