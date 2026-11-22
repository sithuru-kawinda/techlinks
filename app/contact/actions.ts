"use server";

import nodemailer from "nodemailer";

const CONTACT_EMAIL = "techlinks.lk@gmail.com"; // every enquiry is delivered here
const sendFailed = "Sorry, we could not send your message. Please try again later.";

export type ContactState = {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<"name" | "email" | "phone" | "topic" | "message" | "form", string>>;
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

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[contact] GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    return { status: "error", errors: { form: sendFailed }, values };
  }

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass }, connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000 });
    const info = await transporter.sendMail({
      from: `"TechLinks Website" <${user}>`,
      to: CONTACT_EMAIL,
      replyTo: `"${values.name.replace(/["\r\n]/g, "")}" <${values.email}>`,
      subject: `[TechLinks] ${values.topic} - ${values.name}`.replace(/[\r\n]/g, " "),
      text: `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "-"}\nTopic: ${values.topic}\n\n${values.message}`,
    });
    if (!info.accepted.includes(CONTACT_EMAIL)) throw new Error(`Recipient not accepted: ${info.response}`);
    console.log("[contact] email accepted for", CONTACT_EMAIL, "-", info.response);
  } catch (err) {
    console.error("[contact] failed to send email", err);
    return { status: "error", errors: { form: sendFailed }, values };
  }
  return { status: "success" };
}
