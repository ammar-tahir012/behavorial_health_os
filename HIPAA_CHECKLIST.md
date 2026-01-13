# HIPAA Compliance Configuration Checklist

To maintain HIPAA compliance, you MUST configure the following settings in your Supabase Dashboard.

## Authentication Settings (Auth > Providers)

- [ ] **Email Auth**: Enabled
- [ ] **Minimum Password Length**: Set to **12** characters (or more).
- [ ] **Password Requirements**: Checked (require lowercase, uppercase, digit, symbol).
- [ ] **Enable MFA**: Ensure MFA is enabled for the project.

## Session Settings (Auth > Settings)

- [ ] **JWT Expiry**: Set to **900** (15 minutes) or **1800** (30 minutes) to minimize exposure.
- [ ] **Refresh Token Validity**: Set appropriately (e.g., 24 hours), but ensure `Secure` cookies are used if on web.

## Email Templates (Auth > Templates)

- [ ] **Confirm Email**: Remove sensitive info. Ensure link expires quickly.
- [ ] **Reset Password**: ensure link expires in **3600** seconds (1 hour). Use generic wording: "A request was made to reset your password."

## Network & Access (Project Settings)

- [ ] **SMTP Settings**: Use a HIPAA-compliant email provider (e.g., SendGrid, AWS SES) instead of default.
- [ ] **Point-in-Time Recovery (PITR)**: Enable for database backups (Database > Backups).

## Logs & Monitoring

- [ ] **Log Retention**: Check project log retention policy ensures logs are kept for at least 6 years (standard requirement) or export them to a long-term storage bucket.
