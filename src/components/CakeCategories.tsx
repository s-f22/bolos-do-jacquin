import React from "react";
import "./CakeCategories.css";
import { Link } from "react-router-dom";
import type { Color } from "react-bootstrap/esm/types";
// import chocolate from '../assets/candy-bar.svg';
// import { ReactComponent as ChocolateIcon } from '../assets/candy-bar.svg';


type CakeCategory = {
  id: string;
  title: string;
  nomeClasse: string;
  cor_1: Color,
  cor_2: Color
};

const categories: CakeCategory[] = [
  { id: "chocolate", title: "Chocolate", nomeClasse: "iconChocolate", cor_1: "#442300", cor_2: "#623402" },
  { id: "cerimonias", title: "Cerimonias", nomeClasse: "iconCerimonias", cor_1: "#060062", cor_2: "#0900b0" },
  { id: "morango", title: "Morango", nomeClasse: "iconMorango", cor_1: "#610000", cor_2: "#910000" },
  { id: "natal", title: "Natal", nomeClasse: "iconNatal", cor_1: "#073301", cor_2: "#0f5900" },
  { id: "coco", title: "Coco", nomeClasse: "iconCoco", cor_1: "#7f4c36", cor_2: "#a7684c" },
  { id: "destaques", title: "Destaques", nomeClasse: "iconDestaques", cor_1: "#410038", cor_2: "#620055" },
];

export const CakeCategories: React.FC = () => {

  return (
    <div className="cake-container">
      {categories.map((category) => (
        <Link to={`/cakes/${category.id}`}>
          <div key={category.id} className="cake-card">
            <div className="cake-image-container">
              <div style={{background: `linear-gradient(to bottom, ${category.cor_1}, ${category.cor_2})`}} className=" d-flex justify-content-center align-items-center w-100 h-100 coresBackground">
                <div className={category.nomeClasse}></div>
              </div>
              <h3>{category.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
