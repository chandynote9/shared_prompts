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
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleTagClick = (searchContent) => {
    setSearchText(searchContent);
  };

  const handleSearchChange = () => {
    console.log({ searchText });
    const searchLower = searchText.toLowerCase();
    console.log({ searchLower });
    const getFilteredPosts = allPosts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchLower) ||
        post.tag.toLowerCase().includes(searchLower) ||
        post.creator.username.toLowerCase().includes(searchLower)
      );
    });
    console.log({ getFilteredPosts });
    setFilteredPosts(getFilteredPosts);
  };

  useEffect(() => {
    handleSearchChange();
  }, [searchText]);
  return (
    <>
      {session && (
        <section className="feed">
          <form className="relative w-full flex-center">
            <input
              type="search"
              placeholder="Search for tag or username"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              required
              className="search_input peer"
            />
          </form>
          {searchText ? (
            <PromptCardList
              data={filteredPosts}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
          )}
        </section>
      )}
    </>
  );
};

export default Feed;
