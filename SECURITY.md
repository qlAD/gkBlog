# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.2.x   | ✅ Active          |
| 2.1.x   | ✅ Security fixes  |
| < 2.1   | ❌ End of life     |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the project maintainer. You should receive a response within 48 hours. If the issue is confirmed, a patch will be released as soon as possible depending on complexity.

## Security Considerations for Deployments

This project uses MongoDB as a database. When deploying:

1. **Environment Variables**: Never commit `.env.local` files. Always use environment variable injection (Vercel dashboard, Docker env files, or your hosting provider's secrets manager).

2. **Database Security**: Use MongoDB's IP allowlist to restrict access. The `DATABASE_URL` connection string should use a dedicated database user with minimal privileges.

3. **Session Hashing**: The `SALT_IP_ADDRESS` environment variable is used to hash visitor IP addresses for anonymous analytics. Choose a strong, random value for this salt.

4. **Dependencies**: Keep dependencies up to date. Renovate bot is configured in this repository to automate dependency updates.

5. **Content Security**: User-generated content (comments via Twikoo) is sandboxed within its own iframe. The MDX content rendered on pages is from trusted authors only (your own blog posts).

## Supported Browsers

The site is tested on the latest versions of Chrome, Firefox, Safari, and Edge.
