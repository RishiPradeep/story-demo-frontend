"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStories } from "@/apis/getStories";
import { Button } from "@/components/ui/button";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import CalendarHeatMap from "@/components/calenderHeatMap";
import { getDetails } from "@/apis/getDetails";
import { Suspense } from "react";

export default function Stories() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [stories, setStories] = useState([]);
  const [currentStreak, setCurrentStreak] = useState<number | null>(0);
  const [highestStreak, setHighestStreak] = useState<number | null>(0);
  const [storyCount, setStoryCount] = useState<number | null>(0);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    // Function to fetch additional data
    const getData = async (email: string | null) => {
      if (email) {
        try {
          // Replace with your async function to get details
          const data = await getStories(email);
          const dataDetails = await getDetails(email);
          console.log(dataDetails);
          setCurrentStreak(dataDetails.currentStreak);
          setHighestStreak(dataDetails.highestStreak);
          setStoryCount(dataDetails.storyCount._count.stories);
          setHeatmap(dataDetails.heatMap);
          setStories(data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const emailFromQuery = urlParams.get("email");
    const usernameFromQuery = urlParams.get("username");

    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }

    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }

    // Call the fetchData function with email
    getData(email);
  }, [email]);

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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto">
        <div className="flex container mx-auto justify-between mt-8">
          <h1 className="text-4xl font-bold">Hello {username}</h1>
          <Button onClick={handleCreate}>Create Story</Button>
        </div>
        <div className="mt-8">Todays Stories</div>
        <div className="flex flex-col p-4 gap-4">
          {stories.map((item: any) => (
            <div
              onClick={() => handleClick(item.id)}
              key={item.id}
              className="flex gap-4 items-center border border-white p-4 rounded"
            >
              <div>{item.title}</div>
              <div>
                {item.visibility === "Public" ? <FaUnlock /> : <FaLock />}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex w-fit">
          <div className="flex gap-8 border-slate-100 border-2 bg-secondary p-4 rounded-lg">
            <div className="flex flex-col items-center">
              <div>Total Stories</div>
              <div>{storyCount}</div>
            </div>
            <div className="flex flex-col items-center">
              <div>Current Streak</div>
              <div>{currentStreak}</div>
            </div>
            <div className="flex flex-col items-center">
              <div>Longest Streak</div>
              <div>{highestStreak}</div>
            </div>
          </div>
          <div className="ml-8 w-[600px]">
            <CalendarHeatMap heatmap={heatmap}> </CalendarHeatMap>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
