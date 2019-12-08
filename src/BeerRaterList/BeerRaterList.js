import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, userId } from "../firebase";
import BeerRater from "../BeerRater/BeerRater";
import "./BeerRaterList.css";

const BeerRaterList = () => {
  const lastSavedState = {};
  let { id } = useParams();
  const ratingSessionId = parseInt(id);

  const [beers, setBeers] = useState(createInitialState());
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(saveToDb, 20000);

    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    const fetchRatings = async () => {
      const ratings = {};
      const querySnapshot = await db
        .collection("beerRatings")
        .where("userId", "==", userId())
        .where("ratingSessionId", "==", ratingSessionId)
        .get();

      querySnapshot.forEach(doc => {
        const data = { ...doc.data() };

        // Remove timestamp so lastSavedState will function correctly
        delete data.updatedAt;

        ratings[data.beerId] = data;
      });

      console.log("fetched from db", ratings);

      setBeers(ratings);
      setHasFetched(true);
    };
    fetchRatings();
  }, [ratingSessionId]);

  const saveToDb = () => {
    if (!hasFetched) return;
    if (!userId()) return;

    Object.keys(beers).forEach(key => {
      const dbUpdate = {
        ...beers[key],
        ratingSessionId: ratingSessionId,
        userId: userId()
      };

      // Only update if data changed
      if (lastSavedState[key] === JSON.stringify(dbUpdate)) return;

      const documentId = `${key}:${ratingSessionId}:${userId()}`;
      const dbUpdateWithMetadata = {
        ...dbUpdate,
        updatedAt: Date.now()
      };

      db.collection("beerRatings")
        .doc(documentId)
        .set(dbUpdateWithMetadata)
        .then(() => {
          console.log("Data saved to db", dbUpdateWithMetadata);
          lastSavedState[key] = JSON.stringify(dbUpdate);
        });
    });
  };

  const handleRatingChange = newRating => {
    const newState = { ...beers };
    newState[newRating.beerId] = newRating;
    setBeers(newState);
  };

  return (
    <ul className="beer-rater-list">
      {Object.values(beers).map(beerData => (
        <li key={beerData.beerId}>
          <BeerRater
            beerId={beerData.beerId}
            beerName={"Bjór " + beerData.beerId}
            colorRating={beerData.colorRating}
            smellRating={beerData.smellRating}
            tasteRating={beerData.tasteRating}
            xmasRating={beerData.xmasRating}
            comment={beerData.comment}
            onRatingChange={handleRatingChange}
          />
        </li>
      ))}
    </ul>
  );
};

const createInitialState = () => {
  const numberOfBeers = 16;
  const beers = {};

  for (let i = 1; i <= numberOfBeers; i++) {
    beers[i] = {
      beerId: i,
      colorRating: 0,
      smellRating: 0,
      tasteRating: 0,
      xmasRating: 0,
      comment: ""
    };
  }

  return beers;
};

export default BeerRaterList;
