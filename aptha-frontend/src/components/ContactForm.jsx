import React, { useState, useEffect } from "react";

const allServices = [
  "PAN Card",
  "Aadhaar Services",
  "Passport",
  "Voter ID",
  "Scholarships",
  "Admissions",
  "Exams",
  "Web Development",
  "App Development",
  "Automation",
  "Consulting",
  "Marketing",
  "Accounting",
];

const ContactForm = ({ closeForm, preSelectedServices, language }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    services: preSelectedServices || [],
    message: "",
  });


  const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};




  useEffect(() => {
    if (preSelectedServices) {
      setFormData((prev) => ({ ...prev, services: preSelectedServices }));
    }
  }, [preSelectedServices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  if (!formData.name || !formData.location || !formData.phone || formData.services.length === 0) {
    alert(language === "EN" ? "Please fill all required fields" : "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ");
    return;
  }

  // Mobile validation
  if (!isValidPhone(formData.phone)) {
    alert(language === "EN" ? "Enter a valid 10-digit phone number" : "ಸರಿಯಾದ 10 ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ");
    return;
  }

  // Email validation (optional)
  if (formData.email && !isValidEmail(formData.email)) {
    alert(language === "EN" ? "Enter a valid email" : "ಸರಿಯಾದ ಇಮೇಲ್ ನಮೂದಿಸಿ");
    return;
  }

    try {
      const res = await fetch("https://aptha.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(language === "EN" ? "Form submitted successfully" : "ಫಾರ್ಮ್ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ");
        closeForm();
      } else {
        alert(language === "EN" ? "Error submitting form" : "ಫಾರ್ಮ್ ಸಲ್ಲಿಸಲು ದೋಷ");
      }
    } catch (err) {
      console.error(err);
      alert(language === "EN" ? "Error submitting form" : "ಫಾರ್ಮ್ ಸಲ್ಲಿಸಲು ದೋಷ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg flex flex-col gap-4 
                   transform transition-all duration-300 scale-100 sm:scale-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          {language === "EN" ? "Contact Form" : "ಸಂಪರ್ಕ ಫಾರ್ಮ್"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder={language === "EN" ? "Name *" : "ಹೆಸರು *"}
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="location"
          placeholder={language === "EN" ? "Location *" : "ಸ್ಥಳ *"}
          value={formData.location}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="phone"
          placeholder={language === "EN" ? "Phone *" : "ಫೋನ್ *"}
          value={formData.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={language === "EN" ? "Email (optional)" : "ಇಮೇಲ್ (ಐಚ್ಛಿಕ)"}
          value={formData.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <label className="font-semibold text-gray-700">
          {language === "EN" ? "Select Services *" : "ಸೇವೆಗಳು ಆಯ್ಕೆಮಾಡಿ *"}:
        </label>

        {preSelectedServices && preSelectedServices.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {formData.services.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        ) : (
          <div className="border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
            {allServices.map((service) => (
              <label
                key={service}
                className="flex items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded transition"
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => toggleService(service)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  {language === "EN" ? service : "ಕನ್ನಡ " + service}
                </span>
              </label>
            ))}
          </div>
        )}

        <textarea
          name="message"
          placeholder={
            language === "EN"
              ? "Additional message (optional)"
              : "ಹೆಚ್ಚಿನ ಸಂದೇಶ (ಐಚ್ಛಿಕ)"
          }
          value={formData.message}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 min-h-[100px]"
        />

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            {language === "EN" ? "Submit" : "ಸಲ್ಲಿಸು"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition w-full sm:w-auto"
          >
            {language === "EN" ? "Cancel" : "ರದ್ದುಮಾಡು"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
