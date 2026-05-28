import type { DeptArticle } from "@/components/departments/ArticlesSection";
import posts from "@/constants/cms/posts.json";

const NEWS_SLUG = "news-events";
const CANCER_DEPT_SLUG = "caritas-cancer-institute";
const LIMIT = 5;

type LegacyPost = (typeof posts)[number] & {
  departmentSlug?: string | null;
  departmentUrl?: string | null;
};

function departmentPathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const path = url.trim().replace(/^\/+|\/+$/g, "");
  return path || null;
}

/** Department page articles — matches Django Post.objects.filter(department=...)[:5] */
export function getDepartmentArticles(departmentSlug: string): DeptArticle[] {
  const list = posts as LegacyPost[];

  const filtered = list.filter((post) => {
    if (post.categorySlug === NEWS_SLUG) return false;

    const postDeptPath = departmentPathFromUrl(post.departmentUrl);

    if (departmentSlug === CANCER_DEPT_SLUG) {
      return postDeptPath === CANCER_DEPT_SLUG || post.categorySlug === "cancer";
    }

    return postDeptPath === departmentSlug;
  });

  return filtered.slice(0, LIMIT).map((post) => ({
    title: post.title,
    slug: post.slug,
  }));
}

export function applyDepartmentArticles<T extends { slug: string; navItems: { id: string; label: string }[]; articles?: DeptArticle[] }>(
  page: T,
): T {
  const articles = getDepartmentArticles(page.slug);
  const navItems =
    articles.length > 0
      ? page.navItems.some((item) => item.id === "articles")
        ? page.navItems
        : [...page.navItems, { id: "articles", label: "Articles" }]
      : page.navItems.filter((item) => item.id !== "articles");

  return { ...page, articles, navItems };
}
