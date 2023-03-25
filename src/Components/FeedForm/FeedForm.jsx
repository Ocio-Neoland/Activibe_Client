import '../../Pages/ActivityDetail/ActivityDetail.css';

import React from 'react';
const FeedForm = ({
  hiddenStar1,
  hiddenStar2,
  hiddenStar3,
  hiddenStar4,
  hiddenStar5,
  createFeed,
  countingStars,
  newFeed,
  setNewFeed,
}) => {
  return (
    <form onSubmit={(ev) => createFeed(ev)}>
      <ul>
        <button
          type="button"
          value="1"
          onClick={() => countingStars(1, hiddenStar1)}
          ref={hiddenStar1}
        >
          ⭐
        </button>
        <button
          value="2"
          type="button"
          onClick={() => countingStars(2, hiddenStar2)}
          ref={hiddenStar2}
        >
          ⭐
        </button>
        <button
          value="3"
          type="button"
          onClick={() => {
            countingStars(3, hiddenStar3);
          }}
          ref={hiddenStar3}
        >
          ⭐
        </button>
        <button
          value="4"
          type="button"
          onClick={() => countingStars(4, hiddenStar4)}
          ref={hiddenStar4}
        >
          ⭐
        </button>
        <button
          value="5"
          type="button"
          onClick={() => countingStars(5, hiddenStar5)}
          ref={hiddenStar5}
        >
          ⭐
        </button>
      </ul>
      <textarea
        name="textarea2"
        maxLength={200}
        onChange={(ev) => {
          setNewFeed({ ...newFeed, feed: ev.target.value });
        }}
      ></textarea>
      <button type="submit"> + </button>
    </form>
  );
};

export default FeedForm;
