import Link from 'next/link';
import React from 'react';

export default function BreadCrumb({ CategoryName }) {
  return (
    <div className="about-author-content pt-15">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="#">Categorie</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {CategoryName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
