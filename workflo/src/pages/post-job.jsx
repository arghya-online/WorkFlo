import React from "react";
import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isopen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl text-center my-4">
        Post a Job
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        bg-white
        shadow-xl
        p-4
        sm:p-6
        flex
        flex-col
        gap-5
      "
      >
        <div>
          <Input
            placeholder="Job Title"
            {...register("title")}
            className="hover:border-zinc-500 focus:border-black transition"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Textarea
            placeholder="Job Description"
            rows={4}
            {...register("description")}
            className="hover:border-zinc-500 focus:border-black transition"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-1">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="hover:border-zinc-500 transition">
                    <SelectValue placeholder="Job Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      {State.getStatesOfCountry("IN").map(({ name }) => (
                        <SelectItem
                          className="bg-white hover:bg-zinc-300"
                          key={name}
                          value={name}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-1">
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className=" bg-white hover:border-zinc-500 transition">
                    <SelectValue placeholder="Company">
                      {field.value
                        ? companies?.find((c) => c.id === Number(field.value))
                            ?.name
                        : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      {companies?.map(({ name, id }) => (
                        <SelectItem
                          className="bg-white hover:bg-zinc-300"
                          key={id}
                          value={id}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.company_id && (
              <p className="text-sm text-red-500 mt-1">
                {errors.company_id.message}
              </p>
            )}
          </div>
          <div className="border-2 border-zinc-800 rounded-lg sm:col-span-1 text-center px-0 transition hover:bg-zinc-200">
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden border hover:border-zinc-500 transition">
          <h3 className="p-3 font-bold">Job Requirements</h3>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter job requirements here..."
              />
            )}
          />
        </div>
        {errors.requirements && (
          <p className="text-sm text-red-500">{errors.requirements.message}</p>
        )}

        {errorCreateJob?.message && (
          <p className="text-sm text-red-500">{errorCreateJob.message}</p>
        )}

        {loadingCreateJob && <BarLoader width="100%" color="#000000" />}

        <Button
          type="submit"
          size="lg"
          className="
          bg-slate-900 text-white
          hover:bg-slate-800
          px-6
          mt-2
          h-12
          text-base
          hover:opacity-90
          transition
        "
        >
          Submit Job
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
