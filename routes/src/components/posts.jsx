import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params =  useParams()
  console.log(params)
  return (
    <div>
      <h1>Posts</h1>
      Year: {params.year} , Month: {params.month}
    </div>
  );
};

export default Posts;
