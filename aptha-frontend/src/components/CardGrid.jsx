import React from "react";

const cards = [
  "Government Services",
  "Educational Services",
  "Software Solutions",
  "Business Solutions",
  "Healthcare Services",
  "Financial Services",
  "E-Governance",
  "Citizen Services",
  
];

const CardGrid = ({ openOverlay, language }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 md:px-4 lg:px-6 py-6">
      {cards.map((card) => (
        <div
          key={card}
          onClick={() => openOverlay(card)}
          className="
            bg-white 
            rounded-xl 
            p-8 
            shadow-md 
            hover:shadow-[0_15px_30px_rgba(59,130,246,0.35)] 
            hover:scale-105 
            transform 
            transition-all 
            duration-300 
            ease-in-out
            cursor-pointer
            border border-transparent
            hover:border-blue-400
            flex flex-col items-center justify-center
            text-center
            min-h-[150px]
          "
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-2">
            {language === "EN" ? card : "ಕನ್ನಡ " + card}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base md:text-base">
            {language === "EN"
              ? `Click to explore ${card.toLowerCase()}`
              : `ಇದು ${card} ಅನ್ನು ಪರಿಶೀಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
