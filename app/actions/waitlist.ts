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
      from: "Identra HQ <hello@identra.dev>",
      to: email,
      subject: "Access Protocol: Your spot on the Identra waitlist is secured",
      html: `
        <div style="background-color: #030304; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 60px 20px; width: 100%; min-height: 100vh; box-sizing: border-box;">
          
          <div style="max-width: 540px; margin: 0 auto; background-color: #0d0d12; border: 1px solid #1e1e28; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
            
            <!-- Terminal Header Bar -->
            <div style="background-color: #08080a; border-bottom: 1px solid #1e1e28; padding: 14px 24px; display: table; width: 100%; box-sizing: border-box;">
              <div style="display: table-cell; text-align: left; font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #6366f1; font-weight: 600; letter-spacing: 2px;">
                IDENTRA // SECURE_RELAY
              </div>
              <div style="display: table-cell; text-align: right; font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #555;">
                STATUS: [ONLINE]
              </div>
            </div>

            <!-- Body Content -->
            <div style="padding: 40px 32px;">
              <h1 style="font-size: 20px; font-weight: 400; margin: 0 0 24px; color: #ffffff; letter-spacing: -0.5px;">Protocol Initiated: Waitlist Confirmed.</h1>
              
              <p style="font-size: 14px; line-height: 1.7; color: #a1a1aa; margin: 0 0 20px;">
                Thank you for requesting architectural access to Identra. Your cryptographic signature has been logged, and your position in the deployment queue is fully secured.
              </p>

              <p style="font-size: 14px; line-height: 1.7; color: #a1a1aa; margin: 0 0 32px;">
                We are currently scaling our local-first reasoning clusters to ensure every user experiences a strictly confidential, zero-knowledge environment from day one.
              </p>

              <!-- Telemetry / Status Box -->
              <div style="background-color: #030304; border: 1px solid #1e1e28; border-radius: 6px; padding: 20px; margin-bottom: 32px; font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #a1a1aa; line-height: 1.8;">
                <div style="margin-bottom: 8px;"><span style="color: #666;">&gt;</span> clearance_level : <span style="color: #e2e8f0;">[TIER_1_EARLY_ACCESS]</span></div>
                <div style="margin-bottom: 8px;"><span style="color: #666;">&gt;</span> deployment_status : <span style="color: #e2e8f0;">[PENDING_PROVISION]</span></div>
                <div><span style="color: #666;">&gt;</span> core_integrity : <span style="color: #4fd1c5;">[VERIFIED]</span></div>
              </div>

              <p style="font-size: 14px; line-height: 1.7; color: #a1a1aa; margin: 0 0 40px;">
                You will receive an encrypted activation manifest directly to this inbox when your isolated environment is ready to deploy. Maintain monitoring on this channel.
              </p>

              <!-- Sign-off -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 14px; line-height: 1.6; color: #e2e8f0;">
                    Systems Architect Team,<br/>
                    <strong style="font-weight: 600; letter-spacing: 1px;">IDENTRA</strong>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Footer -->
            <div style="background-color: #050507; border-top: 1px solid #1e1e28; padding: 24px 32px; text-align: left;">
              <p style="font-size: 11px; color: #555555; margin: 0; line-height: 1.6; font-family: 'Courier New', Courier, monospace;">
                CONFIDENTIALITY NOTICE: This system-generated manifest is intended only for the designated recipient. Local-first architecture guarantees zero exposure. Do not forward this communication.
              </p>
            </div>

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
