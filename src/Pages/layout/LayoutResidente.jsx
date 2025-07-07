import React from 'react';
import MenuNavbar from '../components/menuNavbarResidente';
import Footer from '../components/footer';

export default function LayoutResidente({ children }) {
  return (
    <div className="layout-root d-flex flex-column min-vh-100">
      <MenuNavbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}