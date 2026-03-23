import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Yapsolutely <onboarding@resend.dev>";

function otpEmailHtml(code: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0b;padding:40px 20px">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#131316;border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden">
        <!-- Header -->
        <tr><td style="padding:32px 32px 0">
          <div style="font-size:15px;font-weight:700;letter-spacing:-0.02em;color:#fafafa">Yapsolutely</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 32px 0">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;letter-spacing:-0.03em;color:#fafafa;line-height:1.2">
            Your verification code
          </h1>
          <p style="margin:0 0 24px;font-size:14px;color:rgba(250,250,250,0.45);line-height:1.6">
            Enter this code to verify your email and secure your workspace.
          </p>
        </td></tr>
        <!-- Code -->
        <tr><td style="padding:0 32px">
          <table cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;width:100%">
            <tr><td style="padding:20px;text-align:center">
              <div style="font-size:32px;font-weight:700;letter-spacing:0.3em;color:#fafafa;font-family:'SF Mono',SFMono-Regular,Consolas,monospace">${code}</div>
            </td></tr>
          </table>
        </td></tr>
        <!-- Expiry -->
        <tr><td style="padding:16px 32px 0">
          <p style="margin:0;font-size:12px;color:rgba(250,250,250,0.3);text-align:center">
            This code expires in 10 minutes.
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:28px 32px 24px">
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px">
            <p style="margin:0;font-size:11px;color:rgba(250,250,250,0.2);line-height:1.5">
              If you didn&rsquo;t request this code, you can safely ignore this email.<br>
              &copy; 2025 Yapsolutely, Inc.
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function generateOtp(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 1000000).padStart(6, "0");
}

export async function sendVerificationEmail(email: string, code: string) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${code} is your Yapsolutely verification code`,
    html: otpEmailHtml(code),
  });

  if (error) {
    console.error("[email] Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
