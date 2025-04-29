// import React, { useState, useEffect } from "react";

// const ArrayTask = () => {
//   const cardData = Array.from({ length: 40 }, (_, i) => ({
//     id: i + 1,
//     title: `Card ${i + 1}`,
//   }));

//   // Initially show 6 cards and store the next 6 cards in moreData
//   const [displayedCards, setDisplayedCards] = useState(cardData.slice(0, 6));
//   const [moreData, setMoreData] = useState(cardData.slice(6, 12));
//   const loadMoreCards = () => {
//     const additionalCards = cardData.slice(
//       displayedCards.length,
//       displayedCards.length + 6
//     );
//     setDisplayedCards((prev) => [...prev, ...additionalCards]);
//     const updatedMoreData = cardData.slice(
//       displayedCards.length + 6,
//       displayedCards.length + 12
//     );
//     setMoreData(updatedMoreData);
//   };
//   useEffect(() => {
//     console.log("Updated moreData:", moreData);
//   }, [moreData]);
//   useEffect(() => {
//     console.log("Updated displayedCards:", displayedCards);
//   }, [displayedCards]);

//   return (
//     <div className="pt-10">
//       <h2 className="text-4xl text-center mb-8">Array Task</h2>

//       <div className="flex flex-col md:flex-row justify-center gap-10 mb-10 text-center">
//         <div className="p-4 border rounded-lg bg-blue-100 max-w-[400px] w-full">
//           <h3 className="font-bold">Displayed Cards</h3>
//           <p>visible cards: {displayedCards.length}</p>
//           <p>Id: {displayedCards.map((card) => card.id).join(", ")}</p>
//         </div>

//         <div className="p-4 border rounded-lg bg-green-100">
//           <h3 className="font-bold">More Data (Stored)</h3>
//           <p>Cards store {moreData.length}</p>
//           <p>IDs: {moreData.map((card) => card.id).join(", ")}</p>
//         </div>

//         <div className="p-4 border rounded-lg bg-yellow-100">
//           <h3 className="font-bold">Total CardData</h3>
//           <p>total Cards: {cardData.length}</p>
//         </div>
//       </div>

//       <div className="flex flex-col items-center gap-4 p-8">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
//           {displayedCards.map((card) => (
//             <div key={card.id} className="p-6 bg-gray-100 rounded-lg shadow">
//               <h3 className="font-semibold">{card.title}</h3>
//               <p>Card ID: {card.id}</p>
//             </div>
//           ))}
//         </div>

//         {displayedCards.length < cardData.length && (
//           <button
//             onClick={loadMoreCards}
//             className="px-8 py-3 cursor-pointer rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Show More
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ArrayTask;
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ArrayTask = () => {
  const cardData = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
  }));
  const [searchParams, setSearchParams] = useSearchParams();
  const visibleCount = parseInt(searchParams.get("visible")) || 6;
  const [displayedCards, setDisplayedCards] = useState(
    cardData.slice(0, visibleCount)
  );
  const [moreData, setMoreData] = useState(
    cardData.slice(visibleCount, visibleCount + 6)
  );
  const updateURL = (newVisibleCount) => {
    setSearchParams({ visible: newVisibleCount });
  };
  const loadMoreCards = () => {
    const additionalCards = cardData.slice(
      displayedCards.length,
      displayedCards.length + 6
    );
    const newDisplayedCards = [...displayedCards, ...additionalCards];
    setDisplayedCards(newDisplayedCards);

    const updatedMoreData = cardData.slice(
      newDisplayedCards.length,
      newDisplayedCards.length + 6
    );
    setMoreData(updatedMoreData);
    updateURL(newDisplayedCards.length);
  };

  const seeLessCards = () => {
    if (displayedCards.length > 6) {
      const reducedCards = displayedCards.slice(
        0,
        Math.max(6, displayedCards.length - 6)
      );
      setDisplayedCards(reducedCards);

      const updatedMoreData = cardData.slice(
        reducedCards.length,
        reducedCards.length + 6
      );
      setMoreData(updatedMoreData);
      updateURL(reducedCards.length);
    }
  };

  const remainingCards = cardData.length - displayedCards.length;

  useEffect(() => {
    console.log("Updated moreData:", moreData);
  }, [moreData]);

  useEffect(() => {
    console.log("Updated displayedCards:", displayedCards);
  }, [displayedCards]);

  return (
    <div className="pt-10">
      <h2 className="text-4xl text-center mb-8">Array Task</h2>

      <div className="flex flex-col md:flex-row justify-center gap-10 mb-10 text-center">
        <div className="p-4 border rounded-lg bg-blue-100 max-w-[400px] w-full">
          <h3 className="font-bold">Displayed Cards</h3>
          <p>Visible cards: {displayedCards.length}</p>
          <p>ID: {displayedCards.map((card) => card.id).join(", ")}</p>
        </div>

        <div className="p-4 border rounded-lg bg-green-100 max-w-[400px] w-full">
          <h3 className="font-bold">More Data (Stored)</h3>
          <p>Cards Stored: {moreData.length}</p>
          <p>ID: {moreData.map((card) => card.id).join(", ")}</p>
        </div>

        <div className="p-4 border rounded-lg bg-yellow-100 max-w-[400px] w-full">
          <h3 className="font-bold">Total CardData</h3>
          <p>Total Cards: {cardData.length}</p>
          <p>Remaining Cards: {remainingCards}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {displayedCards.map((card) => (
            <div key={card.id} className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="font-semibold">{card.title}</h3>
              <p>Card ID: {card.id}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          {displayedCards.length < cardData.length && (
            <button
              onClick={loadMoreCards}
              className="px-8 py-3 cursor-pointer rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              Show More
            </button>
          )}
          {displayedCards.length > 6 && (
            <button
              onClick={seeLessCards}
              className="px-8 py-3 cursor-pointer rounded-md font-semibold bg-red-600 text-white hover:bg-red-700"
            >
              See Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayTask;
