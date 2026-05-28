import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "youtubeId", type: "string" }),
    defineField({ name: "thumbnail", type: "image" }),
  ],
});
