import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 100,
  dur
};