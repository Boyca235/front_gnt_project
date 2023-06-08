import React from 'react';

export default function BreadCrumb({ CategoryName }) {
  return (
    <div className="about-author-content pt-15">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Accueil</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Categorie</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {CategoryName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
