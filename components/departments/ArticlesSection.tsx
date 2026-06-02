import Image from "next/image";
import Link from "next/link";
import { StaggerItem, StaggerReveal } from "@/components/shared/StaggerReveal";

export type DeptArticle = {
  title: string;
  slug: string;
};

export function ArticlesSection({
  articles,
  departmentName,
}: {
  articles: DeptArticle[];
  departmentName: string;
}) {
  if (!articles.length) return null;

  return (
    <section id="deptsections">
      <span id="articles" />
      <div className="container mt-5">
        <div className="row">
          <h3 className="mb-4 text-center">Articles to Read</h3>
          <p className="mb-4 text-center">
            Whether you&apos;re seeking knowledge, inspiration, or valuable insights, our
            articles offer a wealth of information to inform and empower you on your
            journey towards better health and well-being.
          </p>
          <p>&nbsp;</p>
          <StaggerReveal className="col-lg-12">
          {articles.map((post) => (
            <StaggerItem key={post.slug} className="col-lg-12">
              <div className="post">
                <div className="row align-items-center mx-4">
                  <div className="col-lg-11">
                    <h6>{post.title}</h6>
                  </div>
                  <div className="col-lg-1">
                    <Link href={`/articles/${post.slug}`}>
                      <Image
                        src="/img/right-arrow.png"
                        alt="Read article"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </div>
                </div>
                <hr style={{ width: "95%", margin: "30px auto" }} />
              </div>
            </StaggerItem>
          ))}
          </StaggerReveal>
          <p>
            <Link className="mx-4 mt-5" href="/articles" style={{ color: "#c61682" }}>
              View All Articles <i className="bi bi-chevron-right ms-2" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
