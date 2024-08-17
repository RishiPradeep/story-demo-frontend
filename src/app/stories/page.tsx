"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStories } from "@/apis/getStories";
import { Button } from "@/components/ui/button";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function Stories() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Function to fetch additional data
    const getData = async (email: string | null) => {
      if (email) {
        try {
          // Replace with your async function to get details
          const data = await getStories(email);
          setStories(data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };

    const emailFromQuery = searchParams.get("email");
    const usernameFromQuery = searchParams.get("username");

    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }

    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }

    // Call the fetchData function with email
    getData(email);
  }, [searchParams, email]);

  const handleCreate = () => {
    router.push(
      `/createSpace?email=${encodeURIComponent(
        email ? email : ""
      )}&username=${encodeURIComponent(username ? username : "")}`
    );
  };

  const handleClick = (id: number) => {
    router.push(
      `/updateSpace?email=${encodeURIComponent(
        email ? email : ""
      )}&username=${encodeURIComponent(username ? username : "")}&id=${id}`
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex container mx-auto justify-between mt-8">
        <h1 className="text-4xl font-bold">Hello {username}</h1>
        <Button onClick={handleCreate}>Create Story</Button>
      </div>
      <div className="mt-8">Your Stories</div>
      <div className="flex flex-col p-4 gap-4">
        {stories.map((item: any) => (
          <div
            onClick={() => handleClick(item.id)}
            key={item.id}
            className="flex gap-4 items-center border border-white p-4 rounded"
          >
            <div>{item.title}</div>
            <div>
              {item.visibility === "Public" ? <FaUnlock /> : <FaUnlock />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
