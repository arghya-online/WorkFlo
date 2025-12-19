import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";

const schema = z.object({
  experience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, { message: "Experience cannot be negative" }),
  skills: z.string().min(1, { message: "Skills are required" }),
  qualification: z.enum(["Intermediate", "Graduate", "Post-Graduate"], {
    errorMap: () => ({ message: "Qualification is required" }),
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file?.[0]?.type),
      {
        message: "Only .pdf, .doc, or .docx files are allowed",
      }
    ),
});

function ApplyJobDrawer({ job, user, fetchJob, applied }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob, {
    candidate_id: user.id,
    job_id: job.id,
  });

  const onSubmit = (data) => {
    const applicationData = {
      name: user.fullName,
      candidate_id: user.id,
      job_id: job.id,
      experience: data.experience,
      skills: data.skills,
      qualification: data.qualification,
      resumeFile: data.resume[0],
    };
    fnApply(applicationData).then(() => {
      reset();
      fetchJob();
    });
  };

  return (
    <Drawer>
      {/* Trigger */}
      <DrawerTrigger asChild>
        <Button className="h-11 px-6 bg-black text-white hover:bg-zinc-800">
          Apply Now
        </Button>
      </DrawerTrigger>

      {/* Centered Overlay */}
      <DrawerContent
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          md:items-center md:justify-center
          bg-black/40
        "
      >
        {/* Card */}
        <div
          className="
            relative w-full
            sm:max-w-lg
            bg-white
            rounded-none sm:rounded-xl
            shadow-xl
            px-6 py-6 sm:px-8
            max-h-[95vh]
            overflow-y-auto
          "
        >
          {/* Close (X) */}
          <DrawerClose asChild>
            <button
              className="
                absolute top-4 right-4
                rounded-md p-1
                text-zinc-500
                hover:text-zinc-900
                hover:bg-zinc-100
                transition
              "
            >
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>

          {/* Header */}
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-xl font-semibold text-zinc-900">
              Apply for {job?.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-zinc-600">
              {job?.company?.name} · {job?.location}
            </DrawerDescription>
          </DrawerHeader>

          {/* Form */}
          <form className="mt-6 space-y-5">
            <div className="space-y-1.5">
              <Label className="text-sm text-zinc-700">
                Years of Experience
              </Label>
              <Input
                type="number"
                placeholder="e.g. 2"
                className="h-11"
                {...register("experience", {
                  valueAsNumber: true,
                })}
              />
              {errors.experience && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.experience.message}
                </p>
              )}
              <Input
                type="text"
                placeholder="e.g. JavaScript, React, Node.js"
                className="h-11"
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Qualification */}
            <div className="space-y-2">
              <Label className="text-sm text-zinc-700">
                Highest Qualification
              </Label>

              {errors.qualification && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.qualification.message}
                </p>
              )}

              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    {...field}
                  >
                    {["Intermediate", "Graduate", "Post-Graduate"].map((q) => (
                      <Label
                        key={q}
                        htmlFor={q}
                        className="
                      flex items-center gap-2
                      rounded-md border border-zinc-200
                      px-3 py-2 cursor-pointer
                      hover:bg-zinc-50 transition
                    "
                      >
                        <RadioGroupItem id={q} value={q} />
                        <span className="text-sm">{q}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Resume */}
            <div className="space-y-1.5">
              <Label className="text-sm text-zinc-700">Upload Resume</Label>
              <Input
                type="file"
                className="h-11"
                accept=".pdf,.doc,.docx"
                {...register("resume")}
              />
              {errors.resume && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.resume.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end">
              <Button
                className="h-11 bg-black text-white hover:bg-zinc-800 lg:mb-8 sm:mb-6"
                onClick={handleSubmit(onSubmit)}
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ApplyJobDrawer;
