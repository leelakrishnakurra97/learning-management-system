# Nexora Learning - Account Creation & Subscription Workflow Implementation

## Overview
This document describes the complete workflow for user account creation, email credential delivery, and subscription activation in the Nexora Learning platform.

## Complete Workflow Flow

### 1. **User Registration (SignupPage)**
**Path:** `src/components/SignupPage.tsx`

**What Happens:**
- User fills in registration form with:
  - Full Name
  - Gmail Address
  - Age
  - Location
  - Academic Role (Student/Teacher)
  - Class & Board Selection

**Process:**
```
User clicks "Create Account"
  ↓
Form validation
  ↓
API call: POST /api/auth/signup
  ↓
Backend creates user with:
  - Generated secure password (12 chars with special characters)
  - Hashed password stored in database
  ↓
Backend sends credentials email (via Gmail SMTP)
  ↓
Credentials JSON stored in localStorage
  ↓
Frontend redirects to GetCredentialsPage
```

**Key Changes:**
- Password NO LONGER shown in browser UI
- Password NO LONGER returned in API response
- User redirected to subscription page instead of showing credentials modal

---

### 2. **Signup Backend (server/routes/auth.ts)**

**POST /api/auth/signup**

**Input:**
```json
{
  "email": "student@gmail.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT",
  "boardId": "uuid",
  "classId": "uuid"
}
```

**Backend Process:**
```typescript
1. Validate email doesn't exist
2. Generate secure password (12 chars)
   - Contains uppercase, lowercase, numbers, special chars
3. Hash password with bcrypt
4. Create user in database with:
   - Email (lowercase)
   - Password hash
   - First/Last name
   - Role
   - Student/Teacher profile (if applicable)
5. Send credentials email via SMTP
6. Return success response (NO password)
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully. Check your email for credentials.",
  "email": "student@gmail.com",
  "role": "STUDENT"
}
```

**Email Content:**
- Professional HTML email
- Includes secure login credentials
- Lists account features
- Direct call-to-action to complete subscription

---

### 3. **Subscription Page (GetCredentialsPage)**
**Path:** `src/components/GetCredentialsPage.tsx`

**What Happens:**
- Shows subscription package details
- NO password displayed on webpage
- User sees account email
- User clicks "Subscribe & Get Login Credentials"

**Process:**
```
User views subscription options
  ↓
User clicks "Subscribe"
  ↓
Frontend calls: POST /api/auth/subscribe
  ↓
Backend sends subscription confirmation email
  ↓
Frontend shows success state
  ↓
Auto-redirects to Login page (2 sec delay)
```

**Key Features:**
- Secure activation portal badge
- No temporary passwords shown on website
- All credentials sent via email only
- Clear call-to-action button

---

### 4. **Subscription Confirmation (server/routes/auth.ts)**

**POST /api/auth/subscribe**

**Input:**
```json
{
  "email": "student@gmail.com",
  "subscriptionPlan": "Full Academic Access Pass"
}
```

**Backend Process:**
```typescript
1. Find user by email
2. Verify user exists
3. Send subscription confirmation email with:
   - Subscription details
   - Login instructions
   - Credentials reminder
   - Call-to-action button
4. Return redirect to login page
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription confirmed. Credentials sent to email.",
  "redirectTo": "/#/login"
}
```

---

### 5. **Email Service (server/lib/emailService.ts)**

**Secure Password Generation:**
```typescript
function generateSecurePassword(): string {
  // Generates 12-character password with:
  // - Uppercase letters
  // - Lowercase letters
  // - Numbers
  // - Special characters (!@#$%^&*)
  // - Shuffled for randomness
}
```

**Email Functions:**
```typescript
1. sendCredentialsEmail()
   - Sent after signup
   - Contains login credentials
   - Professional formatting
   - Security notice

2. sendSubscriptionConfirmationEmail()
   - Sent after subscription
   - Confirms account activation
   - Lists unlocked features
   - Provides login link
```

**Gmail SMTP Configuration:**
- Uses environment variables from `.env`
- Host: smtp.gmail.com
- Port: 587 (STARTTLS)
- Credentials: App password (not account password)

---

### 6. **Database Structure**

**User Table:**
```
users:
  - id (UUID, Primary Key)
  - email (String, Unique)
  - passwordHash (String, hashed with bcrypt)
  - firstName (String)
  - lastName (String)
  - phoneNumber (String, nullable)
  - role (Enum: ADMIN, TEACHER, STUDENT)
  - createdAt (DateTime)
  - updatedAt (DateTime)
```

**Related Tables:**
- `studentProfile` - Links students to classes/boards
- `teacherProfile` - Stores teacher details
- `adminProfile` - Stores admin department info

---

### 7. **Login Process (LoginPage)**

**Path:** `src/components/LoginPage.tsx`

**What Happens:**
```
User enters email and password
  ↓
Form validates input
  ↓
API call: POST /api/auth/login
  ↓
Backend:
  - Finds user by email
  - Compares password with hash (bcrypt)
  - Generates JWT token
  - Returns user profile
  ↓
Frontend stores auth token in localStorage
  ↓
Dashboard loads with user profile
```

**Login Credentials:**
- Email: The one user registered with
- Password: From the email (temporary password)

---

## Environment Configuration

**File:** `.env`

```
# Database
DATABASE_URL="postgresql://postgres:12345@127.0.0.1:5433/lms_db?schema=public"

# Backend
PORT=3000
JWT_SECRET="nexora-lms-super-secret-jwt-2024"

# Gmail SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="nexoralmslearning@gmail.com"
SMTP_PASS="zrgiibdlrvsahxwn"
SMTP_FROM="Nexora Learning <nexoralmslearning@gmail.com>"
SMTP_SECURE="false"

# Frontend
VITE_API_URL="http://localhost:3000/api"
```

**Important:**
- SMTP credentials are app-specific passwords, not account passwords
- All sensitive values should be in environment variables
- Never commit `.env` file to version control

---

## API Endpoints Summary

| Method | Endpoint | Purpose | Protected |
|--------|----------|---------|-----------|
| POST | `/api/auth/signup` | Create new account | No |
| POST | `/api/auth/login` | Login with credentials | No |
| POST | `/api/auth/subscribe` | Activate subscription | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/check-email` | Verify email availability | No |
| GET | `/api/auth/users` | List all users (admin) | Yes |
| POST | `/api/auth/users` | Create user (admin) | Yes |
| PUT | `/api/auth/users/:id` | Update user (admin) | Yes |
| DELETE | `/api/auth/users/:id` | Delete user (admin) | Yes |

---

## Security Features Implemented

1. **Password Security:**
   - 12-character minimum length
   - Mix of uppercase, lowercase, numbers, special characters
   - Hashed with bcrypt (10 salt rounds)
   - Never exposed in API responses or UI

2. **Email Security:**
   - SMTP credentials in environment variables
   - TLS encryption for email transmission
   - Professional security notice in emails
   - Do not reply email addresses

3. **Database Security:**
   - Passwords stored as bcrypt hashes only
   - UUID for all primary keys
   - Proper foreign key relationships
   - Cascade delete where appropriate

4. **API Security:**
   - JWT tokens for authentication
   - Protected routes with middleware
   - Email verification for signup
   - Role-based access control

5. **Data Privacy:**
   - No password in URL parameters
   - No password in localStorage
   - No password in API responses
   - No password display in UI

---

## Testing Checklist

- [ ] User can sign up with valid email
- [ ] Email validation rejects non-gmail addresses
- [ ] Duplicate email prevention works
- [ ] Password generated securely (12 chars, mixed types)
- [ ] Credentials email sent correctly
- [ ] GetCredentialsPage loads with stored email
- [ ] Subscribe button calls API endpoint
- [ ] Subscription confirmation email sent
- [ ] Redirects to login page after subscription
- [ ] User can login with credentials from email
- [ ] JWT token stored in localStorage after login
- [ ] Dashboard loads correctly after login
- [ ] Logout clears token
- [ ] Admin can manage users
- [ ] Database records created correctly

---

## Troubleshooting

**Email not sending?**
- Check `.env` SMTP credentials
- Verify Gmail app password is correct
- Check network connectivity to smtp.gmail.com:587
- Look for error logs in server console

**Password not working after signup?**
- Check email for generated password
- Verify email case sensitivity
- Ensure password copied correctly (no extra spaces)
- Check user was created in database

**Redirect not working?**
- Check browser console for errors
- Verify GetCredentialsPage component loaded
- Check redirect URL format
- Clear browser cache and try again

**Database connection issues?**
- Verify DATABASE_URL in .env
- Check PostgreSQL is running on port 5433
- Verify database exists and has correct schema
- Run `npm run db:push` to update schema

---

## Future Enhancements

1. **Payment Integration**
   - Integrate Razorpay/Stripe
   - Process payments on Subscribe button
   - Send payment confirmation email

2. **Email Notifications**
   - Class reminders
   - Assignment due dates
   - Performance updates
   - Account alerts

3. **Password Management**
   - Allow password change
   - Forget password recovery
   - Email verification for password reset
   - Session management

4. **Subscription Management**
   - View subscription status
   - Auto-renewal settings
   - Invoice generation
   - Subscription history

5. **Analytics**
   - Track signup sources
   - Monitor email delivery rates
   - Subscription conversion metrics
   - User engagement tracking

---

## Implementation Notes

**Why this approach?**
- **Security:** Passwords never exposed in UI or URLs
- **User Experience:** Clear, simple flow with email confirmation
- **Professional:** Branded email templates with proper formatting
- **Scalable:** Environment-based configuration
- **Maintainable:** Separated concerns (email service, auth routes)

**What changed from original?**
- Removed password from API response
- Removed password from SignupPage modal
- Removed credentials from URL parameters
- Added dedicated subscription flow
- Added professional email templates
- Implemented secure password generation
- Moved SMTP config to environment variables
- Added subscription confirmation email

---

## Files Modified/Created

### Created:
- `server/lib/emailService.ts` - Email utility service

### Modified:
- `.env` - Updated SMTP configuration
- `server/routes/auth.ts` - Updated signup and added subscribe endpoint
- `src/components/SignupPage.tsx` - Removed credentials modal, added redirect
- `src/components/GetCredentialsPage.tsx` - Complete redesign for subscription flow
- `src/services/api.ts` - Added subscribe endpoint

### Unchanged (but important):
- `prisma/schema.prisma` - Database schema
- `src/components/LoginPage.tsx` - Login functionality
- All middleware and utilities

---

## Support & Questions

For implementation questions or issues:
1. Check the troubleshooting section above
2. Review error messages in server console
3. Check `.env` configuration
4. Verify database connection
5. Review email service logs

---

**Last Updated:** June 17, 2026
**Version:** 1.0 - Initial Implementation
**Status:** Ready for Testing
