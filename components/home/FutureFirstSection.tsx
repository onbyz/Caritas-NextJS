import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";

const ACHIEVEMENTS = [
  "Kerala's First Laser Angioplasty System",
  "India's First Telemedic AI ED on Wheels",
  "Kerala's First Hospital to Implement Bharat Bill Payment System",
  "Kerala's First Great Place To Work-Certified Hospital",
  "Kerala's First TrueBeam with HyperArc Technology",
  "Kerala's First 384-Slice Diagnostic Cardiology Dual Energy RT-CT Scan Machine",
];

export function FutureFirstSection() {
  return (
    <section id="future" style={{ backgroundColor: "#F4F6F6", paddingBottom: 0 }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <FadeIn className="row mt-5 animation-element bounce-up">
              <h3 className="my-3 box box1">Future Starts with the FIRST</h3>
              <span style={{ fontSize: 14 }} className="box box1">
                Being FIRST is an honour. We have made our &apos;First&apos; impressions in care
                that took us further in promoting good health and happiness for all.
              </span>
              <div className="col-lg-5 mt-5 hide_mobile">
                <ul className="custom-list">
                  {ACHIEVEMENTS.slice(0, 3).map((item) => (
                    <li key={item} className="mx-2 my-3 box box1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-2 hide_mobile" />
              <div className="col-lg-5 mt-5 hide_mobile">
                <ul className="custom-list">
                  {ACHIEVEMENTS.slice(3).map((item) => (
                    <li key={item} className="mx-2 my-3 box box1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-5 hide_desktop">
                <ul className="custom-list">
                  {ACHIEVEMENTS.map((item) => (
                    <li key={item} className="mx-2 my-3 box box1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link style={{ color: "#C71782!important" }} href="/achievements">
                View All<i className="bi bi-chevron-right ms-2" />
              </Link>
            </FadeIn>
          </div>
          <div className="col-lg-4 my-4 hide_mobile animation-element bounce-up">
            <Image
              src="/img/resized_image_one.jpg"
              alt="Future starts with first"
              width={400}
              height={500}
              className="box box1"
              style={{ height: 500, objectFit: "cover" }}
            />
          </div>
          <div className="col mt-4 hide_desktop animation-element bounce-up">
            <Image
              src="/img/resized_image_one.jpg"
              alt="Future starts with first"
              width={350}
              height={400}
              className="box box1"
              style={{ width: 350 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
