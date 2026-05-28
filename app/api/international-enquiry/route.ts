import { fakeSuccess } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { isAlphaName, str } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const first_name = str(formData, "first_name");
  const last_name = str(formData, "last_name");
  const email = str(formData, "email");
  const phone_number = str(formData, "phone_number");
  const country = str(formData, "country");
  const message = str(formData, "message");

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !country ||
    !message ||
    !isAlphaName(first_name) ||
    !isAlphaName(last_name)
  ) {
    return fakeSuccess();
  }

  await insertFormSubmission("international", {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    message,
  });

  return fakeSuccess();
}
