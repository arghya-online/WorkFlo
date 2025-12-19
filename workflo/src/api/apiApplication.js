import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, applicationData) {
  const supabase = await supabaseClient(token);
  console.log("DEBUG: inside applyToJob, payload:", applicationData);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${applicationData.candidate_id}`;

  // Upload resume
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, applicationData.resumeFile);

  if (storageError) {
    console.error("DEBUG: Error uploading resume:", storageError);
    throw storageError;
  }
  console.log("DEBUG: Resume uploaded successfully, fileName:", fileName);

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { resumeFile, ...insertData } = applicationData;

  // Insert application
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...insertData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("DEBUG: Error creating Application:", error);
    throw error;
  }
  console.log("DEBUG: Application successfully inserted:", data);

  return data;
}

export async function updateApplicationStatus(token, _, application_id, status) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status }) // ✅ enum value
    .eq("id", application_id) // ✅ bigint
    .select();

  if (error) {
    console.error("Error Updating Application Status:", error);
    throw error;
  }

  return data;
}
