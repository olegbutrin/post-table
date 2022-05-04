import { TFetchPosts } from "../utils/types";

const API_URL = "https://jsonplaceholder.typicode.com/posts";


export const fetchPosts: TFetchPosts = (onSuccess, onError) => {
  fetch(API_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Request failed: " + res.statusText);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error: Error) => {
      onError(error.message);
    });
};
