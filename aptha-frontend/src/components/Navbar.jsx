import React from "react";

const Navbar = ({ openContactForm, language, toggleLanguage, totalUsers }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-6 h-20">
      <div className="text-xl font-bold text-blue-700">Aptha</div>
      <div className="flex items-center gap-4">
        <div className="border px-3 py-1 rounded">
          {language === "EN" ? `Users: ${totalUsers}` : `ಬಳಕೆದಾರರು: ${totalUsers}`}
        </div>
        <button
          onClick={toggleLanguage}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          {language}
        </button>
        <button
          onClick={() => openContactForm(null)} // <-- NavBar contact opens dropdown
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {language === "EN" ? "Contact Us" : "ಸಂಪರ್ಕಿಸಿ"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
