"use client";
import { signInWithGoogle, auth } from "./firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginOrCreate } from "@/apis/login";

export default function Home() {
  const router = useRouter();

  const handleLoginRegular = async () => {
    return;
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const email = user.email;
      const username = user.displayName;
      const response = await loginOrCreate(email, username);
      if (response.message === "Created" || response.message === "ok") {
        router.push(
          `/stories?email=${encodeURIComponent(
            email ? email : ""
          )}&username=${encodeURIComponent(username ? username : "")}`
        );
      }
    } catch (error) {
      console.log("Error while signing in", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto rounded-md bg-secondary flex justify-center w-fit p-8 mt-36">
        <div className="flex flex-col gap-4 items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Username" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button onClick={handleLoginRegular}>Submit</Button>
          <h1>OR</h1>
          <div className="flex items-center justify-center dark:bg-gray-800">
            <Button
              onClick={handleLoginGoogle}
              variant={"secondary"}
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              ></img>
              <span>Login with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
