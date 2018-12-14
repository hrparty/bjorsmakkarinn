const beerIds = () => {
  const numberOfBeers = 16;
  const beerIds = [];

  for (let i = 1; i <= numberOfBeers; i++) {
    beerIds.push(i);
  }

  return beerIds;
};

export function addTotalRating(allRatings) {
  allRatings.forEach(rating => {
    rating.totalRating =
      rating.tasteRating * 0.35 +
      rating.xmasRating * 0.35 +
      rating.smellRating * 0.15 +
      rating.colorRating * 0.15;
  });

  return allRatings;
}

export function averageRatingByBeer(allRatings, category) {
  const avgs = beerIds().map(id => {
    const allRatingsForBeerId = allRatings.filter(r => r.beerId === id);
    const avg =
      allRatingsForBeerId.reduce(
        (acc, current) => acc + current[`${category}Rating`],
        0
      ) / allRatingsForBeerId.length;

    return {
      beerId: id,
      [`${category}Avg`]: avg
    };
  });

  return avgs.sort((a, b) => {
    if (a[`${category}Avg`] < b[`${category}Avg`]) {
      return 1;
    }
    if (a[`${category}Avg`] > b[`${category}Avg`]) {
      return -1;
    }
    return 0;
  });
}
