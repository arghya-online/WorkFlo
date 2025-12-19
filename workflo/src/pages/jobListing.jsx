import React, { useEffect, useState } from "react";
import useFetch from "../hooks/use-fetch";
import { getJobs } from "../api/apiJobs";
import JobCard from "@/components/job-card";
import { useUser } from "@clerk/clerk-react";
import { getCompanies } from "../api/apiCompanies";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@radix-ui/react-select";
import { Country, State, City } from "country-state-city";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";

import { Check, ChevronDown } from "lucide-react";

function JobListing() {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
    remote: isRemote,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery, isRemote]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
    setSelectedState("");
    setIsRemote(false);
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="black" />;
  }

  return (
    <div>
      <h1 className="flex justify-center align-center heading text-3xl sm:text-6xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 underline underline-offset-12 underline-rose-200 underline-10">
        Available Jobs
      </h1>

      <section className="w-full max-w-4xl mx-auto mb-10 space-y-4">
        <form
          onSubmit={handleSearch}
          className="bg-white flex gap-2 items-center w-full"
        >
          <Input
            type="text"
            placeholder="Search Jobs by Title..."
            name="search-query"
            className="bg-white flex-1 h-11 px-4 text-base shadow-sm border-slate-300"
          />
          <Button
            type="submit"
            className="bg-zinc-500 h-11 sm:w-28"
            variant="blue"
          >
            Search
          </Button>
        </form>

        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="h-11 flex-1 justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {selectedState
                  ? State.getStateByCodeAndCountry(selectedState, "IN")?.name
                  : "Filter by State"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[260px] p-0 bg-white border border-slate-200 shadow-xl"
            >
              <Command>
                <CommandInput
                  placeholder="Search state..."
                  className="h-10 border-b border-slate-200"
                />

                <CommandList className="max-h-64 overflow-y-auto">
                  <CommandEmpty>No state found.</CommandEmpty>

                  <CommandGroup
                    heading="Indian States"
                    className="sticky top-0 z-10 bg-white border-b border-slate-100"
                  >
                    {State.getStatesOfCountry("IN").map(({ name, isoCode }) => (
                      <CommandItem
                        key={isoCode}
                        value={name}
                        onSelect={() => {
                          setSelectedState(isoCode);
                          setLocation(name);
                        }}
                        className="cursor-pointer"
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            selectedState === isoCode
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="bg-white h-11 flex-1 justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {company_id
                  ? companies?.find((c) => c.id === Number(company_id))?.name
                  : "Filter by Company"}
                <ChevronDown className=" bg-white ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search company..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No company found.</CommandEmpty>
                  <CommandGroup>
                    {companies?.map(({ name, id }) => (
                      <CommandItem
                        key={id}
                        value={name}
                        onSelect={(currentValue) => {
                          setCompany_id(currentValue === company_id ? "" : id);
                        }}
                      >
                        {name}
                        <Check
                          className={`ml-auto h-4 w-4 ${
                            company_id === id ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className=" bg-white h-11 flex-1 justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {isRemote ? "Remote" : "On-Site"}
                <ChevronDown className="bg-white ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search job type..."
                  className="h-9"
                />
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      value="On-Site"
                      onSelect={() => {
                        setIsRemote(false);
                      }}
                    >
                      On-Site
                      <Check
                        className={`ml-auto h-4 w-4 ${
                          !isRemote ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                    <CommandItem
                      value="Remote"
                      onSelect={() => {
                        setIsRemote(true);
                        setLocation("");
                        setSelectedState("");
                      }}
                    >
                      Remote
                      <Check
                        className={`ml-auto h-4 w-4 ${
                          isRemote ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            className="h-11 sm:w-auto w-full sm:ml-auto shadow-sm hover:shadow-md transition-shadow duration-300 bg-red-600 text-white hover:bg-red-700"
            variant="destructive"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </section>

      {loadingJobs === false && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div className="mt-8 text-xl text-center col-span-full">
              No Jobs Found{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;
