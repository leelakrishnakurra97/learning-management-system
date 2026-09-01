import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

/**
 * Initialize email transporter with Gmail SMTP configuration from environment variables
 */
function getTransporter(): Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error('SMTP_USER and SMTP_PASS environment variables are required');
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return transporter;
}

/**
 * Generate a secure random password (12 characters)
 */
export function generateSecurePassword(): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';

  const allChars = uppercase + lowercase + numbers + special;
  let password = '';

  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Send account credentials email to user
 */
export async function sendCredentialsEmail(
  email: string,
  firstName: string,
  lastName: string,
  generatedPassword: string,
  role: string
): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || 'Nexora Learning <nexoralmslearning@gmail.com>',
      to: email,
      subject: '🎓 Your Nexora Learning Account Credentials',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
          <!-- White card container -->
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px;">
              <h2 style="color: #667eea; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                🎓 Nexora Learning
              </h2>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                Your Academic Journey Starts Here
              </p>
            </div>

            <!-- Greeting -->
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Welcome, <strong>${firstName} ${lastName}!</strong>
            </p>

            <!-- Success message -->
            <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
              <p style="color: #2e7d32; margin: 0; font-size: 14px; font-weight: 600;">
                ✅ Your account has been successfully created!
              </p>
            </div>

            <!-- Credentials section -->
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; font-weight: 600;">
                Your Login Credentials:
              </p>
              
              <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 12px; margin-bottom: 10px; border-radius: 4px; font-family: monospace;">
                <p style="margin: 0 0 5px 0; color: #666; font-size: 12px;">
                  <strong>Email:</strong>
                </p>
                <p style="margin: 0 0 10px 0; color: #333; font-size: 14px; font-weight: bold; word-break: break-all;">
                  ${email}
                </p>
                <p style="margin: 0 0 5px 0; color: #666; font-size: 12px;">
                  <strong>Temporary Password:</strong>
                </p>
                <p style="margin: 0; color: #333; font-size: 14px; font-weight: bold; letter-spacing: 1px;">
                  ${generatedPassword}
                </p>
              </div>

              <p style="color: #ff9800; font-size: 12px; margin: 0; font-style: italic;">
                ⚠️ Save these credentials safely. This is your temporary password.
              </p>
            </div>

            <!-- Account Info -->
            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <p style="color: #1976d2; margin: 0; font-size: 12px; font-weight: 600;">
                <strong>Account Role:</strong> ${role}
              </p>
            </div>

            <!-- Next steps -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
                📋 Next Steps:
              </h3>
              <ol style="color: #555; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Open the Nexora Learning portal</li>
                <li>Click on "Sign In"</li>
                <li>Enter your email and the temporary password above</li>
                <li>Complete your profile setup</li>
                <li>Start your learning journey!</li>
              </ol>
            </div>

            <!-- Security notice -->
            <div style="background-color: #fff3e0; border-left: 4px solid #ff9800; padding: 12px; border-radius: 4px; margin-bottom: 25px;">
              <p style="color: #e65100; margin: 0; font-size: 12px; font-weight: 600;">
                🔒 Security Reminder: Never share your password with anyone. Our support team will never ask for your password.
              </p>
            </div>

            <!-- Support -->
            <p style="color: #777; font-size: 12px; text-align: center; margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
              Need help? Contact our support team at 
              <a href="mailto:support@nexoralearning.com" style="color: #667eea; text-decoration: none; font-weight: 600;">
                support@nexoralearning.com
              </a>
            </p>

            <!-- Footer -->
            <p style="color: #999; font-size: 11px; text-align: center; margin: 10px 0 0 0; font-style: italic;">
              This is an automated message from Nexora Learning. Please do not reply to this email.
            </p>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Credentials email sent successfully to ${email}. Temp Password: ${generatedPassword}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send credentials email:', error);
    return false;
  }
}

/**
 * Send subscription confirmation email with credentials
 */
export async function sendSubscriptionConfirmationEmail(
  email: string,
  firstName: string,
  lastName: string,
  generatedPassword: string,
  role: string,
  subscriptionPlan: string = 'Full Academic Access Pass'
): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || 'Nexora Learning <nexoralmslearning@gmail.com>',
      to: email,
      subject: '✅ Subscription Confirmed - Your Nexora Learning Credentials Inside',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
          <!-- White card container -->
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Success Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 40px; margin-bottom: 10px;">✅</div>
              <h2 style="color: #4caf50; margin: 0; font-size: 26px; font-weight: 800;">
                Subscription Activated!
              </h2>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 13px;">
                Welcome to Nexora Learning
              </p>
            </div>

            <!-- Greeting -->
            <p style="color: #333; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
              Dear <strong>${firstName} ${lastName}</strong>,
            </p>

            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
              Your subscription to <strong>${subscriptionPlan}</strong> has been successfully activated! 🎉
            </p>

            <!-- Subscription Details -->
            <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); padding: 20px; border-radius: 6px; margin-bottom: 25px; border: 1px solid #667eea40;">
              <p style="color: #667eea; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; font-weight: 700;">
                Subscription Details:
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px; border-bottom: 1px solid #667eea30;">Plan:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #667eea30;">${subscriptionPlan}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px; border-bottom: 1px solid #667eea30;">Status:</td>
                  <td style="padding: 8px 0; color: #4caf50; font-size: 13px; font-weight: 600; text-align: right; border-bottom: 1px solid #667eea30;">✅ ACTIVE</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px;">Role:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 13px; font-weight: 600; text-align: right;">${role}</td>
                </tr>
              </table>
            </div>

            <!-- Login Credentials -->
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 6px; margin-bottom: 25px; border: 2px dashed #667eea;">
              <p style="color: #667eea; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0; font-weight: 700;">
                📧 Your Portal Login Credentials:
              </p>
              
              <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 4px; font-family: 'Courier New', monospace;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">
                  Email Address:
                </p>
                <p style="margin: 0 0 12px 0; color: #333; font-size: 14px; font-weight: bold; word-break: break-all; background-color: #f9f9f9; padding: 8px; border-radius: 3px;">
                  ${email}
                </p>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">
                  Temporary Password:
                </p>
                <p style="margin: 0; color: #333; font-size: 14px; font-weight: bold; letter-spacing: 2px; background-color: #f9f9f9; padding: 8px; border-radius: 3px;">
                  ${generatedPassword}
                </p>
              </div>

              <p style="color: #ff6f00; font-size: 11px; margin: 10px 0 0 0; font-weight: 600;">
                ⚠️ Save these credentials in a safe place. You'll need them to log in.
              </p>
            </div>

            <!-- Features Unlocked -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; font-size: 13px; font-weight: 700; margin: 0 0 12px 0;">
                🚀 Features Now Unlocked:
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div style="background-color: #f0f7ff; padding: 10px; border-radius: 4px; border-left: 3px solid #2196f3;">
                  <p style="color: #1565c0; font-size: 12px; font-weight: 600; margin: 0;">📚 All Subjects</p>
                </div>
                <div style="background-color: #f0f7ff; padding: 10px; border-radius: 4px; border-left: 3px solid #2196f3;">
                  <p style="color: #1565c0; font-size: 12px; font-weight: 600; margin: 0;">🎥 Live Classes</p>
                </div>
                <div style="background-color: #f0f7ff; padding: 10px; border-radius: 4px; border-left: 3px solid #2196f3;">
                  <p style="color: #1565c0; font-size: 12px; font-weight: 600; margin: 0;">🤖 AI Tutor Support</p>
                </div>
                <div style="background-color: #f0f7ff; padding: 10px; border-radius: 4px; border-left: 3px solid #2196f3;">
                  <p style="color: #1565c0; font-size: 12px; font-weight: 600; margin: 0;">📊 Analytics</p>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 6px; text-align: center; margin-bottom: 25px;">
              <p style="color: #ffffff; font-size: 13px; margin: 0 0 12px 0; line-height: 1.5;">
                Ready to start learning? Log in to your account now to begin!
              </p>
              <a href="http://localhost:5173/#/login" style="display: inline-block; background-color: #ffffff; color: #667eea; padding: 10px 24px; text-decoration: none; font-weight: 700; border-radius: 4px; font-size: 12px;">
                Go to Portal
              </a>
            </div>

            <!-- Support -->
            <p style="color: #777; font-size: 12px; text-align: center; margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
              Questions? Contact our support team at 
              <a href="mailto:support@nexoralearning.com" style="color: #667eea; text-decoration: none; font-weight: 600;">
                support@nexoralearning.com
              </a>
            </p>

            <!-- Footer -->
            <p style="color: #999; font-size: 11px; text-align: center; margin: 10px 0 0 0; font-style: italic;">
              This is an automated message. Please do not reply to this email.
            </p>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Subscription confirmation email sent to ${email}. Temp Password: ${generatedPassword}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send subscription confirmation email:', error);
    return false;
  }
}

/**
 * Send OTP email for password reset
 */
export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.SMTP_FROM || 'Nexora Learning <nexoralmslearning@gmail.com>',
      to: email,
      subject: '🔒 Password Reset OTP - Nexora Learning',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:#fff;border-radius:8px;padding:20px;">
            <h2 style="color:#333;margin:0 0 8px 0">Password Reset Request</h2>
            <p style="color:#555;margin:0 0 12px 0">Use the one-time code below to reset your Nexora Learning password. This code expires in 10 minutes.</p>
            <div style="font-family:monospace;background:#f6f8fa;padding:12px;border-radius:6px;text-align:center;font-size:20px;font-weight:700;letter-spacing:2px;">${otp}</div>
            <p style="color:#999;font-size:12px;margin-top:12px">If you did not request this, ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}`);
    return true;
  } catch (err) {
    console.error('❌ Failed to send OTP email:', err);
    return false;
  }
}
