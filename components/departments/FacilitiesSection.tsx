import { cleanLegacyText } from "@/lib/sanitize-text";

export type FacilitiesProps = {
  heading?: string;
  intro?: string;
  anchorId?: string;
  html?: string;
  columns?: [string[], string[]];
  bgGray?: boolean;
};

export function FacilitiesSection({ facilities }: { facilities: FacilitiesProps }) {
  const anchor = facilities.anchorId ?? "facilities";
  const col1 = facilities.columns?.[0]?.map(cleanLegacyText).filter(Boolean) ?? [];
  const col2 = facilities.columns?.[1]?.map(cleanLegacyText).filter(Boolean) ?? [];

  return (
    <section
      id="deptsections"
      style={
        facilities.bgGray !== false
          ? { backgroundColor: "#F4F6F6", maxWidth: "100%" }
          : undefined
      }
    >
      <span id={anchor} />
      <div className="container mt-5 pb-4">
        <div className="row justify-content-center">
          <h3 className="text-center pb-4">{facilities.heading ?? "Facilities"}</h3>
        </div>
        {facilities.intro && (
          <p className="text-center mb-4" style={{ lineHeight: 1.6 }}>
            {cleanLegacyText(facilities.intro)}
          </p>
        )}
        {facilities.html && (
          <div
            className="legacy-static-content"
            dangerouslySetInnerHTML={{ __html: facilities.html }}
          />
        )}
        {col1.length > 0 && (
          <div
            className="row justify-content-center"
            style={{ width: "60%", margin: "0 auto" }}
          >
            <div className={col2.length > 0 ? "col-lg-6" : "col-12"}>
              <ul className="treatment-procedure-list">
                {col1.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {col2.length > 0 && (
              <div className="col-lg-6">
                <ul className="treatment-procedure-list">
                  {col2.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
