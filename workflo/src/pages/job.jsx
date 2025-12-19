import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import ApplyJobDrawer from "../components/ApplyJobDrawer";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ApplicationCard from "../components/ApplicationCard";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import React from "react";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  useEffect(() => {
    if (job) {
      console.log("DEBUG: Job Data:", job);
      console.log("DEBUG: Applications:", job.applications);
      console.log("DEBUG: User ID:", user?.id);
      console.log("DEBUG: Recruiter ID:", job.recruiter_id);
      console.log(
        "DEBUG: Match?",
        job?.recruiter_id === user?.id
      );
    }
  }, [job, user]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isopen = value === "open";
    fnHiringStatus(isopen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-10 mt-6">
      {/* Header */}
      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between border-b pb-6">
        <h1 className="text-zinc-900 font-extrabold tracking-tight text-3xl sm:text-5xl">
          {job?.title}
        </h1>

        <img
          src={job?.company?.logo_url}
          alt={job?.title}
          className="h-10 sm:h-12 object-contain "
        />
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base text-zinc-700">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 text-zinc-500" />
          <span>{job?.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-zinc-500" />
          <span>{job?.applications?.length} Applicants</span>
        </div>

        <div className="flex items-center gap-2">
          {job?.isOpen || job?.isopen ? (
            <>
              <DoorOpen className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Open</span>
            </>
          ) : (
            <>
              <DoorClosed className="h-4 w-4 text-red-600" />
              <span className="text-red-600 font-medium">Closed</span>
            </>
          )}
        </div>
      </div>

      {/* Recruiter Controls */}
      {job?.recruiter_id === user?.id && (
        <div className="max-w-sm">
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`h-11 font-medium ${job?.isOpen || job?.isopen
                  ? "bg-emerald-950 text-emerald-200 border-emerald-900"
                  : "bg-red-950 text-red-200 border-red-900"
                }`}
            >
              <SelectValue
                placeholder={`Hiring Status ${job?.isOpen || job?.isopen ? "( Open )" : "( Closed )"
                  }`}
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* About */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
          About the job
        </h2>
        <p className="text-zinc-800 leading-relaxed sm:text-lg">
          {job?.description}
        </p>
      </section>

      {/* Requirements */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
          What we are looking for
        </h2>

        <div className="prose prose-zinc max-w-none sm:prose-lg">
          <MDEditor.Markdown
            source={job?.requirements}
            className="prose prose-zinc max-w-none sm:prose-lg"
            style={{
              color: "Black",
              fontSize: "16px",
              backgroundColor: "transparent",
            }}
          />

          {/*Resume Applications */}

          {job && user && job?.recruiter_id !== user?.id && (
            <ApplyJobDrawer
              job={job}
              user={user}
              fetchJob={fnJob}
              applied={job?.applications?.find(
                (ap) => ap.candidate_id === user?.id
              )}
            />
          )}
        </div>
      </section>

      {/* Loader */}
      {loadingHiringStatus && (
        <div className="pt-4">
          <BarLoader width="100%" color="#36d7b7" />
        </div>
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
            Applications
          </h2>
          {job.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;
