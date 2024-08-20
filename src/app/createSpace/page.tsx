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
import { Suspense } from "react";
import { makeSubmit } from "@/apis/makeSubmit";

import { createStory } from "@/apis/createStory";

export default function Space() {
  const router = useRouter();
  const [username, setUsername] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [story, setStory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("Public");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromQuery = urlParams.get("email");
    const usernameFromQuery = urlParams.get("username");

    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const handleSave = async () => {
    await createStory(email, title, story, visibility);
    await makeSubmit(email);
    router.push(
      `/stories?email=${encodeURIComponent(
        email ? email : "",
      )}&username=${encodeURIComponent(username ? username : "")}`,
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center p-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
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
              Create
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
        </div>
      </div>
    </Suspense>
  );
}
