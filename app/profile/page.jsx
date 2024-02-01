"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async (id) => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (userId) fetchPosts(userId);
    if (session?.user?.id) fetchPosts(session?.user?.id);
  }, [session?.user.id, userId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={userId ? userId : "My"}
      desc="Welcome to your personalized page. Share your exceptional prompts and inspire others with your imagination "
      data={myPosts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
