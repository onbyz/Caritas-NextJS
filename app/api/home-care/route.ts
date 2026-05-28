import { getPageUrl, successWithRedirect } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { agreeTermsChecked, isPhone10to14, str } from "@/lib/forms/validation";
export async function POST(request: Request) {
  const formData = await request.formData();

  const first_name = str(formData, "first_name");
  const last_name = str(formData, "last_name");
  const email = str(formData, "email");
  const phone_number = str(formData, "phone_number");
  const pkg = str(formData, "package");

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !pkg ||
    !isPhone10to14(phone_number) ||
    !agreeTermsChecked(formData)
  ) {
    return successWithRedirect("/success");
  }

  await insertFormSubmission("home-care", {
    first_name,
    last_name,
    email,
    phone_number,
    package: pkg,
    agree_terms: true,
  });

  return successWithRedirect("/success");
}
