import React, { useState } from "react";

const servicesMap = {
  "Government Services": ["PAN Card", "Aadhaar Services", "Passport", "Voter ID"],
  "Educational Services": ["Scholarships", "Admissions", "Exams"],
  "Software Solutions": ["Web Development", "App Development", "Automation"],
  "Business Solutions": ["Consulting", "Marketing", "Accounting"],
};

const ServiceOverlay = ({ card, closeOverlay, openContactForm, language }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherService, setOtherService] = useState("");

  const handleToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setOtherService(""); // deselect other
  };

  const handleOtherChange = (e) => {
    setOtherService(e.target.value);
    if (e.target.value) setSelectedServices([]); // disable other selections
  };

  const handleContactNow = () => {
    const servicesToSend = otherService ? [otherService] : selectedServices;
    if (servicesToSend.length === 0) {
      alert(language === "EN" ? "Select at least one service" : "ಕನಿಷ್ಠ ಒಂದು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ");
      return;
    }
    openContactForm(servicesToSend);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold text-blue-700">
          {language === "EN" ? card : "ಕನ್ನಡ " + card}
        </h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {servicesMap[card].map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedServices.includes(s)}
                onChange={() => handleToggle(s)}
                disabled={otherService !== ""}
              />
              {language === "EN" ? s : "ಕನ್ನಡ " + s}
            </label>
          ))}

          <div className="mt-2">
            <label className="font-semibold">
              {language === "EN" ? "Other Services" : "ಇತರೆ ಸೇವೆಗಳು"}:
            </label>
            <input
              type="text"
              value={otherService}
              onChange={handleOtherChange}
              className="border px-3 py-2 rounded w-full mt-1"
              placeholder={language === "EN" ? "Enter service" : "ಸೇವೆಯನ್ನು ನಮೂದಿಸಿ"}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleContactNow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {language === "EN" ? "Contact Now" : "ಸಂಪರ್ಕಿಸಿ"}
          </button>
          <button
            onClick={closeOverlay}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            {language === "EN" ? "Back" : "ಹಿಂದಕ್ಕೆ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverlay;
