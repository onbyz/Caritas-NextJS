import { cleanLegacyText } from "@/lib/sanitize-text";

/** Two-column treatment lists — matches Django department pages without accordions */
export function TreatmentListSection({
  intro,
  column1,
  column2,
  secondIntro,
  width = "60%",
}: {
  intro?: string;
  column1: string[];
  column2?: string[];
  secondIntro?: string;
  width?: string;
}) {
  const items1 = column1.map(cleanLegacyText).filter(Boolean);
  const items2 = column2?.map(cleanLegacyText).filter(Boolean) ?? [];
  const introText = intro ? cleanLegacyText(intro) : undefined;
  const secondIntroText = secondIntro ? cleanLegacyText(secondIntro) : undefined;
  const singleColumn = items2.length === 0;

  return (
    <div className="row justify-content-center department-treatments-content">
      {introText && (
        <p
          className={`mb-4 mt-3 department-treatments-section__intro ${
            singleColumn ? "col-lg-10 mx-auto" : "text-center"
          }`}
          style={{ lineHeight: 1.6 }}
        >
          {introText}
        </p>
      )}
      <div
        className="row justify-content-center"
        style={{ width: singleColumn ? "90%" : width, margin: "0 auto" }}
      >
        {singleColumn ? (
          <div className="col-12 col-lg-8">
            <ul className="treatment-procedure-list mb-0">
              {items1.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="col-lg-5">
              <ul className="treatment-procedure-list">
                {items1.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="treatment-procedure-list">
                {items2.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {secondIntroText && (
        <p
          className="text-center mt-4 col-12 department-treatments-section__intro"
          style={{ fontWeight: 500, lineHeight: 1.6 }}
        >
          {secondIntroText}
        </p>
      )}
    </div>
  );
}
