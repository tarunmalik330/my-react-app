import React, { useState, useEffect } from "react";

const ArrayTask = () => {
  const cardData = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
  }));

  // Initially show 6 cards and store the next 6 cards in moreData
  const [displayedCards, setDisplayedCards] = useState(cardData.slice(0, 6));
  const [moreData, setMoreData] = useState(cardData.slice(6, 12));

  // Function to handle "Show More" functionality
  const loadMoreCards = () => {
    // Add next 6 cards to displayedCards
    const additionalCards = cardData.slice(
      displayedCards.length,
      displayedCards.length + 6
    );
    setDisplayedCards((prev) => [...prev, ...additionalCards]);

    // Add the next set of 6 cards to moreData
    const updatedMoreData = cardData.slice(
      displayedCards.length + 6,
      displayedCards.length + 12
    );
    setMoreData(updatedMoreData);
  };

  // Log the updated moreData when it changes
  useEffect(() => {
    console.log("Updated moreData:", moreData);
  }, [moreData]);

  // Log the updated displayedCards when it changes
  useEffect(() => {
    console.log("Updated displayedCards:", displayedCards);
  }, [displayedCards]);

  return (
    <div className="pt-10">
      <h2 className="text-4xl text-center">Card Display</h2>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Display the displayed cards */}
          {displayedCards.map((card) => (
            <div key={card.id} className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="font-semibold">{card.title}</h3>
              <p>{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Show "Show More" button if there are more cards to load */}
        {displayedCards.length < cardData.length && (
          <button
            onClick={loadMoreCards}
            className={`px-8 py-3 cursor-pointer rounded-md font-semibold ${
              displayedCards.length >= cardData.length
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            {displayedCards.length >= cardData.length
              ? "No More Items"
              : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ArrayTask;
