import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CardGrid from "./components/CardGrid";
import ServiceOverlay from "./components/ServiceOverlay";
import ContactForm from "./components/ContactForm";

function App() {
  const [language, setLanguage] = useState("EN");
  const [overlayCard, setOverlayCard] = useState(null);
  const [contactServices, setContactServices] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  // ✅ Track total visitors
  useEffect(() => {
    let users = localStorage.getItem("totalUsers") || 0;
    users = parseInt(users) + 1;
    localStorage.setItem("totalUsers", users);
    setTotalUsers(users);
  }, []);

  // ✅ Toggle language between English & Kannada
  const toggleLanguage = () => setLanguage(language === "EN" ? "KA" : "EN");

  // ✅ Open service detail overlay
  const openOverlay = (card) => setOverlayCard(card);
  const closeOverlay = () => setOverlayCard(null);

  // ✅ Open contact form (either blank or pre-filled)
  const openContactForm = (services = []) => {
    setContactServices(services);
    closeOverlay(); // close overlay if open
  };

  const closeContactForm = () => setContactServices(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* ✅ Sticky Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar
          openContactForm={() => openContactForm([])}
          language={language}
          toggleLanguage={toggleLanguage}
          totalUsers={totalUsers}
        />
      </header>

      {/* ✅ Scrollable Content (below navbar) */}
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <CardGrid openOverlay={openOverlay} language={language} />
        </div>
      </main>

      {/* ✅ Footer (optional, add branding later) */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Aptha. All rights reserved.
      </footer>

      {/* ✅ Service overlay (card details popup) */}
      {overlayCard && (
        <ServiceOverlay
          card={overlayCard}
          closeOverlay={closeOverlay}
          openContactForm={openContactForm}
          language={language}
        />
      )}

      {/* ✅ Contact form overlay */}
      {contactServices !== null && (
        <ContactForm
          preSelectedServices={contactServices}
          closeForm={closeContactForm}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
