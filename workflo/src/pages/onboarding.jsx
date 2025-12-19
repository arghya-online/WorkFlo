import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { PersonStanding, PersonStandingIcon } from "lucide-react";

function Onboarding() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role: role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating user metadata:", err);
      });
  };

  useEffect(() => {
    if (user && user.unsafeMetadata?.role) {
      const role = user.unsafeMetadata.role;
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <BarLoader color="#2563eb" width={"100%"} />
      </div>
    );
  }
  return (
    <div className="mt-32 flex flex-col items-center justify-center px-6 text-center sm:mt-40">
      <h2 className="gradient-title font-extrabold tracking-tighter text-5xl sm:text-6xl md:text-7xl">
        I am a...
      </h2>

      <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
        <Button
          className="
        w-full sm:w-auto
        border border-slate-300 bg-white px-10 py-4
        text-base font-semibold text-slate-900
        transition-colors
        hover:bg-slate-100
      "
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          className="
        w-full sm:w-auto
        bg-slate-900 px-10 py-4
        text-base font-semibold text-white
        transition-colors
        hover:bg-slate-800
      "
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
