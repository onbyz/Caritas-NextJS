import { fakeSuccess, getPageUrl } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { isValidEnquireMessage, str } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (formData.get("website")) {
    return fakeSuccess();
  }

  const name = str(formData, "name");
  const email = str(formData, "email");
  const phone_number = str(formData, "phone_number") || str(formData, "phone");
  const message = str(formData, "message");

  if (!name || !email || !phone_number || !message || !isValidEnquireMessage(message)) {
    return fakeSuccess();
  }

  await insertFormSubmission("enquire", {
    name,
    email,
    phone_number,
    message,
    page_url: getPageUrl(request),
  });

  return fakeSuccess();
}
