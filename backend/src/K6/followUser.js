import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 200 },
    { duration: "5s", target: 2 },
    { duration: "20s", target: 500 },
    { duration: "1s", target: 2 },
  ],
  thresholds: {
    http_req_failed: ["rate < 0.2"],
    http_req_duration: ["p(90)<300"],
  },
};

export default function () {
  const body = JSON.stringify({
    following_userID: "74e97217-2940-42d3-8d7c-2a2bf13869a6",
    followed_userID: "b11c3c89-4b91-44e6-acd8-a69caec9aeec",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post("http://localhost:5000/follow", body, params);
  sleep(1);
}