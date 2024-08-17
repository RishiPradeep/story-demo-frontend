"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import SelectVisibility from "@/components/selectVisibility";
import { useSearchParams } from "next/navigation";
import { getDetails } from "@/apis/getDetails";
import { makeSubmit } from "@/apis/makeSubmit";
import CalendarHeatMap from "@/components/calenderHeatMap";
import { getStoryDetails } from "@/apis/getStoryDetails";
import { updateStory } from "@/apis/updateStory";

export default function updateSpace() {
  const router = useRouter();
  const [id, setId] = useState<any>(null);
  const [username, setUsername] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [story, setStory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState<number | null>(0);
  const [highestStreak, setHighestStreak] = useState<number | null>(0);
  const [visibility, setVisibility] = useState<string>("Public");
  const [heatmap, setHeatmap] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    // Function to fetch additional data
    const fetchData = async (email: string | null) => {
      if (email) {
        try {
          // Replace with your async function to get details
          const data = await getDetails(email);
          const storyData = await getStoryDetails(id);
          setCurrentStreak(data.currentStreak);
          setHighestStreak(data.highestStreak);
          setHeatmap(data.heatMap);
          setTitle(storyData.story.title);
          setStory(storyData.story.story);
          setVisibility(storyData.story.visibility);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };

    const emailFromQuery = searchParams.get("email");
    const usernameFromQuery = searchParams.get("username");
    const idFromQuery = searchParams.get("id");

    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
    if (idFromQuery) {
      setId(idFromQuery);
    }

    // Call the fetchData function with email
    fetchData(email);
  }, [searchParams, email]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const handleSave = async () => {
    await makeSubmit(email);
    await updateStory(id, title, story);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Welcome {username}</h1>
          <div className="flex gap-4">
            <SelectVisibility setVisibility={setVisibility} />
            <Button onClick={handleLogout} variant={"destructive"}>
              {" "}
              Logout
            </Button>
          </div>
        </div>
        <div className="grid w-full gap-4 mt-8">
          <Label htmlFor="message-3">Your Title</Label>
          <Textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="h-[60px] font-bold"
            placeholder="Enter a unique title here."
            id="message-3"
          />
        </div>
        <div className="grid w-full gap-4 mt-8">
          <Label htmlFor="message-2">Your Story</Label>
          <Textarea
            onChange={(e) => {
              setStory(e.target.value);
            }}
            value={story}
            className="h-[650px]"
            placeholder="Write your story here."
            id="message-2"
          />
          <p className="text-sm text-muted-foreground">
            Click submit when you are ready to submit the story
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={handleSave} className="w-20 bg-green-300">
            Update
          </Button>
          <Button
            onClick={() => {
              setStory("");
            }}
            className="w-20"
            variant={"destructive"}
          >
            Clear
          </Button>
        </div>
        <hr className="mt-8" />
        <div className="mt-8 flex w-fit">
          <div className="flex gap-8 border-slate-100 border-2 bg-secondary p-4 rounded-lg">
            <div className="flex flex-col items-center">
              <div>Total Stories</div>
              <div>15</div>
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
    </div>
  );
}
