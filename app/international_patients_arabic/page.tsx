import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DepartmentStickyNav } from "@/components/departments/DepartmentStickyNav";
import { InternationalEnquiryForm } from "@/components/international/InternationalEnquiryForm";
import { buildMetadata } from "@/lib/metadata";

const NAV = [
  { id: "overview", label: "نظرة عامة" },
  { id: "services", label: "الخدمات" },
  { id: "plan", label: "خطط زيارتك" },
  { id: "departments", label: "الأقسام" },
  { id: "about", label: "عن كاريتاس" },
];

export const metadata = buildMetadata({
  title: "المرضى الدوليون | مستشفى كاريتاس",
  description:
    "رعاية صحية عالمية للمرضى الدوليين في مستشفى كاريتاس، كوتايام، مع دعم السفر والتأشيرة والمتابعة الطبية.",
  path: "/international_patients_arabic",
});

export default function InternationalPatientsArabicPage() {
  return (
    <SiteLayout>
      <section className="py-5" dir="rtl">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 style={{ fontWeight: 600 }}>المرضى الدوليون</h1>
              <h2 style={{ color: "#c71782", fontWeight: 300 }}>الرعاية الرحيمة بلا حدود</h2>
            </div>
            <div className="col-lg-2 text-start">
              <Link href="/international_patients" style={{ color: "#000" }}>
                English
              </Link>{" "}
              |{" "}
              <Link className="mainheading" href="/international_patients_arabic">
                عربي
              </Link>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center px-0" style={{ margin: "auto 0" }}>
              <Image
                src="/img/patient-measuring-blood-pressure.png"
                alt="المرضى الدوليون"
                width={900}
                height={400}
                className="img-fluid"
              />
            </div>
            <div className="col-lg-4 col-md-10 col-sm-12 px-5 py-5" style={{ backgroundColor: "#c71782" }}>
              <h4 className="text-light">
                هل لديكم أسئلة؟
                <br />
                نحن هنا للمساعدة
              </h4>
              <p className="text-light">
                تواصلوا معنا لنبدأ معاً رحلتكم نحو رعاية صحية متميزة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DepartmentStickyNav items={NAV} />

      <section id="deptsections" dir="rtl">
        <span id="overview" />
        <div className="container py-5">
          <h3>مرحباً بكم في مستشفى كاريتاس — وجهتكم العالمية للرعاية الصحية</h3>
          <p className="mt-4">
            يقدّم مستشفى كاريتاس خدمات طبية متقدمة للمرضى القادمين من مختلف دول العالم، مع فريق متخصص في
            تنسيق المواعيد، التأشيرات، الإقامة، والمتابعة قبل وبعد العلاج.
          </p>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#F4F6F6" }} dir="rtl">
        <span id="services" />
        <div className="container py-5">
          <h3>خدماتنا للمرضى الدوليين</h3>
          <ul className="mt-4">
            <li>تقرير طبي وخطة علاج أولية خلال وقت سريع.</li>
            <li>دعم التأشيرة الطبية والاستقبال من المطار.</li>
            <li>مساعدة لغوية (العربية والإنجليزية).</li>
            <li>تنسيق الإقامة، المواعيد، والدفع الميسر.</li>
          </ul>
        </div>
      </section>

      <section id="deptsections" dir="rtl">
        <span id="plan" />
        <div className="container py-5">
          <h3>خطّط زيارتك بسهولة</h3>
          <p className="mt-3">
            نقوم بتنسيق رحلتك العلاجية من أول استفسار وحتى العودة الآمنة بعد استكمال الخطة الطبية.
          </p>
        </div>
      </section>

      <section id="deptsections" style={{ backgroundColor: "#F4F6F6" }} dir="rtl">
        <span id="departments" />
        <div className="container py-5">
          <h3>الأقسام والتخصصات</h3>
          <p className="mt-3">يمكنكم استعراض الأقسام الطبية الرئيسية عبر نسخة الموقع الإنجليزية.</p>
          <Link href="/international_patients" style={{ color: "#c71782" }}>
            الانتقال إلى صفحة الأقسام <i className="bi bi-chevron-right ms-2" />
          </Link>
        </div>
      </section>

      <section id="deptsections" dir="rtl">
        <span id="about" />
        <div className="container py-5">
          <h3>عن مستشفى كاريتاس</h3>
          <p className="mt-3">
            لأكثر من ستة عقود، يقدّم مستشفى كاريتاس رعاية صحية متقدمة تجمع بين الخبرة الطبية والاهتمام
            الإنساني.
          </p>
        </div>
      </section>

      <InternationalEnquiryForm />
    </SiteLayout>
  );
}
