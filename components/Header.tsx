
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 p-4 shadow-lg text-center sticky top-0 z-20">
      <h1 className="text-2xl font-bold text-white tracking-wider">Terminology Dictionary</h1>
      <p className="text-blue-200 text-sm">A Fast PWA Dictionary</p>
    </header>
  );
};

export default Header;
