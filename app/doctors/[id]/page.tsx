import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { buildMetadata } from "@/lib/metadata";
import { getDoctorById, mergedToDeptDoctor } from "@/services/doctors";
import { BRAND } from "@/constants/brand";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) return {};
  return buildMetadata({
    title: `${doctor.name} | Caritas Hospital`,
    description: doctor.designation || doctor.specialization,
    path: `/doctors/${doctor.slug}`,
  });
}

export default async function DoctorDetailPage({ params }: Props) {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  if (!doctor) notFound();

  const card = mergedToDeptDoctor(doctor);

  return (
    <SiteLayout>
      <section className="py-5">
        <div className="container">
          <p className="mb-3">
            <Link href="/doctors" style={{ color: "#c71782" }}>
              ← All doctors
            </Link>
          </p>
          <div className="row align-items-start g-4">
            {card.imageUrl && (
              <div className="col-md-4">
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  width={320}
                  height={320}
                  className="img-fluid rounded"
                  unoptimized={card.imageUrl.startsWith("/media/")}
                />
              </div>
            )}
            <div className="col-md-8">
              <h1 style={{ fontWeight: 600 }}>{card.name}</h1>
              {card.designation && <h2 style={{ color: "#c71782", fontWeight: 300 }}>{card.designation}</h2>}
              {doctor.specialization && <p className="mt-2">{doctor.specialization}</p>}
              {card.appointmentEnabled !== false && (
                <p className="mt-4">
                  <a
                    href={BRAND.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ backgroundColor: "#c71782", color: "#fff" }}
                  >
                    Book An Appointment
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
