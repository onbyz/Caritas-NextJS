import { defineField, defineType } from "sanity";

export const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "legacyId",
      type: "string",
      title: "Legacy ID (Django UUID)",
      description:
        "Matches the original site doctor ID. Used to override imported doctors when editing in Sanity.",
    }),
    defineField({ name: "designation", type: "string" }),
    defineField({
      name: "specialization",
      type: "string",
      title: "Specialization",
      description:
        "Must match the legacy site grouping (e.g. Dermatology & Cosmetology, Gastroenterology).",
    }),
    defineField({
      name: "department",
      type: "reference",
      to: [{ type: "department" }],
      title: "Primary department (optional)",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
    }),
    defineField({
      name: "legacyImagePath",
      type: "string",
      title: "Legacy image path",
      description: "e.g. /media/doctors/Dr_24.png — used when no Sanity image is uploaded.",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display order",
      initialValue: 999,
    }),
    defineField({
      name: "appointmentEnabled",
      type: "boolean",
      title: "Show book appointment link",
      initialValue: true,
    }),
    defineField({
      name: "isVisible",
      type: "boolean",
      title: "Visible on site",
      initialValue: true,
    }),
    defineField({ name: "qualifications", type: "text", title: "Qualifications" }),
    defineField({ name: "experience", type: "text" }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "specialization",
      media: "image",
    },
  },
});
