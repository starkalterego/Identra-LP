"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  try {
    // 1. Add to Resend Audience (Contacts)
    // Replace with your actual Audience ID from the dashboard
    const audienceId = process.env.RESEND_AUDIENCE_ID; 

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // 2. Send the automated welcome email
    await resend.emails.send({
      from: "Identra HQ <onboarding@resend.dev>", // Note: Free Resend accounts can only send to verified emails. Upgrade/verify domain for production (e.g., hello@identra.com)
      to: email,
      subject: "Secured: Your spot on the Identra waitlist",
      html: `
        <div style="background-color: #030304; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 60px 20px; width: 100%; min-height: 100vh; box-sizing: border-box;">
          <div style="max-width: 520px; margin: 0 auto; background-color: #0d0d12; border: 1px solid #222; border-radius: 12px; padding: 40px; box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
            
            <!-- Minimalist Logo Representation -->
            <div style="text-align: center; margin-bottom: 32px;">
              <span style="font-size: 18px; font-weight: 600; letter-spacing: 3px; color: #ffffff;">IDENTRA</span>
            </div>

            <!-- Body -->
            <h1 style="font-size: 22px; font-weight: 500; margin-bottom: 24px; letter-spacing: -0.5px; color: #ffffff;">Access Secured.</h1>
            
            <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;">
              Thank you for requesting early access to Identra. Your position has been securely logged in our system.
            </p>

            <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin-bottom: 32px;">
              We are finalizing our confidential AI operating system to bring you an environment built for deep focus, local-first memory, and highly secure workflows.
            </p>

            <!-- Status Box -->
            <div style="background-color: #1a1a24; border: 1px solid #2a2a35; border-radius: 8px; padding: 18px 24px; margin-bottom: 32px;">
              <p style="font-family: monospace; font-size: 11px; color: #8b8b99; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Status</p>
              <p style="font-size: 14px; color: #4fd1c5; margin: 0; font-weight: 500;">✓ Waitlist confirmed</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin-bottom: 40px;">
              As a waitlist member, you will be among the first to receive an activation link when early access spots open. Watch this inbox.
              <br/><br/>
              Regards,<br/>
              <strong style="color: #ededed; font-weight: 500;">The Identra Team</strong>
            </p>

            <!-- Footer -->
            <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 24px;" />
            <p style="font-size: 12px; color: #555; text-align: center; margin: 0;">
              Identra HQ &middot; Confidential AI Layer<br/>
              If you did not request this, please ignore this email.
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("already exists")) {
      return { error: "You are already on the waitlist." };
    }
    return { error: "Something went wrong. Please try again later." };
  }
}
