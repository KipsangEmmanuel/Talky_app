import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 100,
  duration: "10s",
};

export default function () {
  const body = JSON.stringify({
    parentCommentID: "700af1a8-46e2-4189-b5a6-a560bf03e81c",
    comment:
      "Raindrops on the umbrella, nature's lullaby, soothing, calming, comforting embrace.",
    postID: "aac94e1e-fcb4-48c7-8add-243bda111a40",
    userID: "33f9de61-d6b8-4d61-b1f4-b8fec2e4052f",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    
    },
  };

  http.post("http://localhost:5000/post/", body, params);
  sleep(1);
}