export const homepageQuery = `{
  "heroSlides": *[_type == "heroSlide"] | order(order asc) {
    _id, title, description, order,
    "desktopImage": desktopImage,
    "mobileImage": mobileImage,
    ctaLabel, ctaHref
  },
  "news": *[_type == "post" && category == "news"] | order(publishedAt desc)[0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt
  },
  "articles": *[_type == "post" && category == "article"] | order(publishedAt desc)[0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc)[0...6] {
    _id, title, youtubeId, thumbnail
  }
}`;

export const doctorsQuery = `*[_type == "doctor" && isVisible != false] | order(order asc, name asc) {
  _id, name, slug, legacyId, designation, specialization,
  "department": department->{ name, "slug": slug.current },
  image, legacyImagePath, order, appointmentEnabled, isVisible, qualifications
}`;

export const allDoctorsQuery = `*[_type == "doctor"] | order(order asc, name asc) {
  _id, name, slug, legacyId, designation, specialization,
  image, legacyImagePath, order, appointmentEnabled, isVisible
}`;

export const doctorBySlugQuery = `*[_type == "doctor" && slug.current == $slug][0] {
  _id, name, slug, designation, qualifications, experience,
  "department": department->{ name, "slug": slug.current },
  image, bio
}`;

export const departmentBySlugQuery = `*[_type == "department" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, heroTitle, heroSubtitle,
  bannerImage, overviewHeading, overviewImage,
  overviewParagraphs, overviewFooterParagraphs,
  treatmentsIntro, treatments,
  facilitiesIntro, facilitiesCol1, facilitiesCol2,
  navItems,
  doctorGroups[]{
    heading,
    doctors[]->{
      _id, name, slug, legacyId, designation, specialization,
      image, legacyImagePath, order, appointmentEnabled, isVisible
    }
  },
  "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...5]{
    title, slug
  }
}`;

export const customPageBySlugQuery = `*[_type == "customPage" && slug.current == $slug][0] {
  _id, title, subtitle, heroImage, navItems, sections
}`;

export const postsByCategoryQuery = `*[_type == "post" && category == $category] | order(publishedAt desc) {
  _id, title, slug, excerpt, mainImage, publishedAt, category
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, body, excerpt, mainImage, publishedAt, category,
  "department": department->{ name, "slug": slug.current }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title, description, ogImage, phoneNumbers
}`;
