import type { Metadata } from "next";

import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Brands } from "@/components/sections/brands";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Subscribe } from "@/components/sections/subscribe";
import { TalkingContact } from "@/components/sections/talking-contact";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { VideoBanner } from "@/components/sections/video-banner";
import { WorkProcess } from "@/components/sections/work-process";
import { sitePages } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  about,
  blog,
  brands,
  hero,
  homeContact,
  homeTestimonials,
  projects,
  services,
  stats,
  subscribe,
  videoBanner,
  workProcess,
} from "@/content/beranda";
import { team } from "@/content/tim";

const page = sitePages[0];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function Home() {
  return (
    <>
      <Hero {...hero} />
      <About {...about} />
      <Services {...services} />
      <WorkProcess {...workProcess} />
      <Projects {...projects} />
      <Testimonials {...homeTestimonials} className="space-top" />
      <Brands {...brands} className="bg-secondary" />
      <Team {...team} />
      <Stats {...stats} />
      <VideoBanner {...videoBanner} />
      <TalkingContact {...homeContact} />
      <Blog {...blog} />
      <Subscribe {...subscribe} />
    </>
  );
}
