import { getPageUrl, successWithRedirect, verifyRecaptcha } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { isPhone10to14, str } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (str(formData, "additional_field")) {
    return successWithRedirect("/success");
  }

  const first_name = str(formData, "first_name");
  const last_name = str(formData, "last_name");
  const email = str(formData, "email");
  const phone_number = str(formData, "phone_number");
  const message = str(formData, "message");
  const captcha = str(formData, "g-recaptcha-response") || null;

  const valid =
    first_name &&
    last_name &&
    email &&
    phone_number &&
    message &&
    isPhone10to14(phone_number) &&
    (await verifyRecaptcha(captcha));

  if (!valid) {
    return successWithRedirect("/success");
  }

  await insertFormSubmission("contact-us", {
    first_name,
    last_name,
    email,
    phone_number,
    message,
    page_url: getPageUrl(request),
  });

  return successWithRedirect("/success");
}
