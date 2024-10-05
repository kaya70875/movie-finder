import { useState } from "react";
import "../sites/_CommentSection.scss";
import useFetch from "../../hooks/useFetch";
import { MovieReviewsResults } from "../../types";
import CountStars from "../reusables/movies/CountStars";

export default function CommentSection({ id }: { id: number }) {
  const { data: comments } = useFetch<MovieReviewsResults>(
    `/movie/${id}/reviews?language=en-US&`
  );
  const results = comments?.results || [];

  const [expand, setExpand] = useState(false);

  function handleClick(index: number) {
    const commentsDiv = document.getElementById(`comment-${index}`);
    if (commentsDiv) {
      commentsDiv.classList.toggle("active");

      if (commentsDiv.classList.contains("active")) {
        setExpand(true);
      } else {
        setExpand(false);
      }
    }
  }

  return (
    <div className="container__comments">
      <p className="big-paragraph">Popular Reviews This Week</p>
      <div className="wrap__containers">
        {results.length !== 0 ? (
          results.map((result, index) => (
            <div className="comments__wrap" id={`comment-${index}`} key={index}>
              <div className="line"></div>
              <div className="comments__top">
                <div className="user-info">
                  <h2 className="user-name">{result.author}</h2>
                  <p
                    className="published-date"
                  >
                    {new Date(result.created_at).getFullYear()}
                  </p>
                </div>
                
                {result.author_details.rating ? (
                  <CountStars rating={result.author_details.rating} />
                ) : (
                  "No Rating"
                )}
              </div>
              <div className="comments__comment" key={result.id}>
                <p>
                  {result.content
                    .replaceAll("</em>", "")
                    .replaceAll("<em>", "")}
                </p>
              </div>
              {result.content.length > 400 && (
                <p className="see-more" onClick={() => handleClick(index)}>
                  {expand ? "collapse" : "see more"}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="no-comment">No Comments Available</p>
        )}
      </div>
    </div>
  );
}
