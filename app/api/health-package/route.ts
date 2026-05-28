import { fakeSuccess, getPageUrl } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { str } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = str(formData, "name");
  const email = str(formData, "email");
  const phone_number = str(formData, "phone_number");
  const pkg = str(formData, "package");

  if (!name || !phone_number || !pkg) {
    return fakeSuccess();
  }

  await insertFormSubmission("health-package", {
    name,
    email: email || "",
    phone_number,
    package: pkg,
    page_url: getPageUrl(request),
  });

  return fakeSuccess();
}
