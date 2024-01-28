"use client";
import Form from "@components/Form";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const promptId = searchParams.get("id");
  console.log({ promptId });
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      const { prompt, tag } = data;
      setPost({ prompt, tag });
    })();
  }, [promptId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Update Error", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleEdit}
    />
  );
};

export default UpdatePrompt;
