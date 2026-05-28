import { successWithRedirect } from "@/lib/forms/api-helpers";
import { insertFormSubmission } from "@/lib/forms/legacy-db";
import { agreeTermsChecked, isPhone10to14, optionalStr, str } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const formData = await request.formData();

  const first_name = str(formData, "first_name");
  const last_name = str(formData, "last_name");
  const email = str(formData, "email");
  const country = str(formData, "country");
  const phone_number = str(formData, "phone_number");
  const gender = str(formData, "gender");
  const dob = str(formData, "dob");
  const department_id = str(formData, "department");
  const doctor_id = str(formData, "doctor");

  if (
    !first_name ||
    !last_name ||
    !email ||
    !country ||
    !phone_number ||
    !gender ||
    !dob ||
    !department_id ||
    !doctor_id ||
    !isPhone10to14(phone_number) ||
    !agreeTermsChecked(formData)
  ) {
    return successWithRedirect("/success");
  }

  await insertFormSubmission("book-consultation", {
    first_name,
    last_name,
    email,
    country,
    phone_number,
    gender,
    dob,
    department_id,
    doctor_id,
    message: optionalStr(formData, "message"),
    op_number: optionalStr(formData, "op_number"),
    agree_terms: true,
  });

  return successWithRedirect("/success");
}
