import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Logo from "/logo.png";
import { Button } from "../components/ui/button";
import { SignedIn, SignedOut, UserButton, SignIn } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams("");
  const { user } = useUser();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="WorkFlo Logo" className="w-36 h-40" />
        </Link>
        <h3 className="text-bold font-bold text-zinc-700 tracking-normal mr-20">
          {user?.unsafeMetadata?.role || "GUEST"}
        </h3>

        <div>
          <SignedOut>
            <Button
              variant="outline"
              className="
                bg-slate-900 text-white
                hover:bg-slate-800 transition-colors
                focus-visible:outline-offset-2 focus-visible:outline-slate-400
              "
              onClick={() => setShowSignIn(true)}
            >
              <PenBox className="mr-2 h-4 w-4" />
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<PenBox size={15} />}
                    href="/saved-jobs"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>

              {user && user.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button
                    className="
                    bg-slate-900 text-white
                    hover:bg-slate-800 transition-colors
                    focus-visible:outline-offset-2 focus-visible:outline-slate-400
                  "
                  >
                    Post a job
                  </Button>
                </Link>
              )}
            </div>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-1000"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
}

export default Header;
