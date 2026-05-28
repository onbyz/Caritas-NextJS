const ENQUIRE_MESSAGE = /^[A-Za-z0-9\s]{1,100}$/;
const ALPHA_NAME = /^[A-Za-z]+$/;
const PHONE_10 = /^[0-9]{10}$/;
const PHONE_10_14 = /^[0-9]{10,14}$/;

export function isValidEnquireMessage(message: string): boolean {
  return ENQUIRE_MESSAGE.test(message);
}

export function isAlphaName(value: string): boolean {
  return ALPHA_NAME.test(value.trim());
}

export function isPhone10(value: string): boolean {
  return PHONE_10.test(value);
}

export function isPhone10to14(value: string): boolean {
  return PHONE_10_14.test(value);
}

export function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function optionalStr(formData: FormData, key: string): string | null {
  const s = str(formData, key);
  return s || null;
}

export function agreeTermsChecked(formData: FormData, key = "agree_terms"): boolean {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}
