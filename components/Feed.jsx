"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleTagClick = () => {};

  return (
    <>
      {session && (
        <section className="feed">
          <form className="relative w-full flex-center">
            <input
              type="text"
              placeholder="Search for tag or username"
              // value={searchtext}
              // onChange={handleSearchChange}
              required
              className="search_input peer"
            />
          </form>
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        </section>
      )}
    </>
  );
};

export default Feed;
