import React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import Banner from "/banner.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import companies from "../data/companies";
import faq from "../data/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Navigate } from "react-router-dom";

function Landing() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-20 text-center sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-24">
        <h1 className="heading text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-slate-900">
          Find your dream job
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto">
          Go in your flow and get hired faster.
        </p>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <Link
            to="/jobs"
            className="
              inline-flex items-center justify-center
              bg-slate-900 px-9 py-3.5
              text-sm font-semibold tracking-wide text-white
              transition-colors duration-200
              hover:bg-slate-800 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Browse jobs
          </Link>

          <Link
            to="post-job"
            className="
              inline-flex items-center justify-center
              border border-slate-300 px-9 py-3.5
              text-sm font-semibold tracking-wide text-slate-700
              transition-colors duration-200
              hover:border-slate-400 hover:text-slate-900
               focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Post a job
          </Link>
        </div>
      </section>

      {/* Company carousel */}
      <section className="mt-8 max-w-6xl mx-auto px-6">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({
              delay: 900,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="display-flex w-full gap-4">
            {companies.map((company) => (
              <CarouselItem
                key={company.id}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex items-center justify-center"
              >
                <img
                  src={company.path}
                  alt={company.name}
                  className="h-20 sm:h-20 md:h-20 object-contain  transition-all duration-200"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <img
        src={Banner}
        alt="Banner"
        className="mt-16 mx-auto object-contain  transition-all duration-200"
      />

      {/* Future sections */}
      <section className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-slate-300 bg-white">
          <div className="px-4 py-3 text-lg font-semibold text-slate-900 border-b border-slate-200">
            For Job Hunters
          </div>
          <div className="px-4 py-3 text-sm text-slate-600 leading-snug">
            Apply to roles that actually fit you. One profile. No friction.
          </div>
        </Card>

        <Card className="border border-slate-300 bg-white">
          <div className="px-4 py-3 text-lg font-semibold text-slate-900 border-b border-slate-200">
            For Recruiters
          </div>
          <div className="px-4 py-3 text-sm text-slate-600 leading-snug">
            Find the right talent faster. Streamlined hiring for growing teams.
          </div>
        </Card>
      </section>

      {/* FAQ Section */}

      <section className="max-w-7xl mx-auto py-8">
        <Accordion type="single" collapsible className="w-full">
          <h1 className="heading mt-10 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-8 after:content-[''] after:block after:w-full after:h-1 after:bg-slate-900 after:mb-4 after:mt-4">
            Frequently Asked Questions
          </h1>
          {faq.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={`item-${index}`}
              className="px-2"
            >
              <AccordionTrigger
                className="pb-5 text-left text-lg font-medium text-black
                transition-colors duration-200
                hover:no-underline hover:text-slate-700
                relative pl-8
                before:absolute before:left-0 before:top-1/2
                before:h-2 before:w-2 before:-translate-y-1/2
                before:bg-black/40
                data-[state=open]:before:bg-black
                data-[state=open]:before:scale-125
                before:transition-all before:duration-300 before:ease-out"
              >
                {item.question}
              </AccordionTrigger>

              <AccordionContent
                className="
            pb-5 text-base leading-relaxed text-black/70
            transition-all duration-300 ease-out
          "
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}

export default Landing;
