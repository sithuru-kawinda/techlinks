"use server";

export type ContactState = {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<"name" | "email" | "phone" | "topic" | "message", string>>;
  values?: Record<string, string>;
};

const topics = ["Find a technician", "Join as a technician", "Partnership or business", "Feedback or support", "Something else"];

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = { name: text(formData, "name"), email: text(formData, "email"), phone: text(formData, "phone"), topic: text(formData, "topic"), message: text(formData, "message") };
  const errors: NonNullable<ContactState["errors"]> = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone && !/^\+?[\d\s()-]{7,20}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!topics.includes(values.topic)) errors.topic = "Choose a topic.";
  if (values.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (values.message.length > 2000) errors.message = "Please keep your message under 2000 characters.";

  if (Object.keys(errors).length) return { status: "error", errors, values };

  // TODO: no backend yet. Deliver the enquiry (email, database or CRM) here.
  console.log("[contact] new enquiry", values);
  return { status: "success" };
}
