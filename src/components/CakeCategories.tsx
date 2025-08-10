// src/components/CakeCategories.tsx
import React from "react";
import "./CakeCategories.css";

type CakeCategory = {
  id: string;
  title: string;
  image: string;
};

const categories: CakeCategory[] = [
  { id: "simples", title: "Simples", image: "https://www.receitasja.com.br/wp-content/uploads/2025/03/receitasbr_A_golden-brown_bundt_cake_with_a_soft_fluffy_textu_6c7d431b-feae-4266-b7e5-0a6dec9a86b3_0-1-1024x570.png" },
  { id: "recheados", title: "Recheados", image: "https://www.estadao.com.br/resizer/oFDrDp3xgfze9zuyNaR5gnyURVA=/arc-anglerfish-arc2-prod-estadao/public/FIVYQFU6J5ND3PYRA6XQHR4NW4.jpg" },
  { id: "defrutas", title: "De Frutas", image: "https://www.daninoce.com.br/wp-content/uploads/2018/11/como-utilizar-frutas-na-decoracao-de-bolos-dani-noce-destaque-960x625.jpg" },
  { id: "comcobertura", title: "Com Cobertura", image: "https://www.mococa.com.br/wp-content/uploads/2022/03/Cobertura-de-leite-condensado-para-bolo-com-2-ingredientes.jpeg" },
  { id: "especiais", title: "Especiais", image: "https://static.marketofchoice.com/uploads/2025/03/Cake-GroupShot.jpg" },
  { id: "contato", title: "Contato", image: "https://www.sindprevsrn.org.br/wp-content/uploads/2023/03/123.jpeg" },
];

export const CakeCategories: React.FC = () => {
  return (
    <div className="cake-container">
      {categories.map((category) => (
        <div key={category.id} className="cake-card">
          <div className="cake-image-container">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
