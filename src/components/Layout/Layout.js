import Head from 'next/head';
import React from 'react';
export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} | Magazine du tech gabonais`
            : 'Gabon New Tech'}
        </title>
        <link rel="icon" href="/images/icon/fabicon.png" />
      </Head>
      {children}
    </>
  );
}
