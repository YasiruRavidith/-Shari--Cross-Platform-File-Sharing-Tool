# Security Guidelines

## Environment Variables Protection

This project has been secured to prevent sensitive information from being exposed in the repository.

### Protected Files

The following files contain sensitive credentials and are **NOT** tracked in Git:

- `.env` and all `.env.*` files (except `.env.example`)
- `.pooler_url.txt` (database connection pooler URL)
- Any files matching `*.pooler_url.txt`

### Setup Instructions

1. **Backend Environment Variables**
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your actual credentials:
     - `DATABASE_URL`: Your PostgreSQL database connection string
     - `JWT_SECRET`: A strong random secret for JWT token signing
     - `SUPABASE_KEY`: Your Supabase anonymous key
     - `SUPABASE_URL`: Your Supabase project URL
     - `VERCEL_OIDC_TOKEN`: Your Vercel OIDC token (for production)

2. **Database Pooler URL** (if needed)
   - Copy `backend/.pooler_url.example.txt` to `backend/.pooler_url.txt`
   - Add your actual database pooler connection string

### Important Security Notes

⚠️ **NEVER commit sensitive files to the repository**

- Always use `.env.example` files as templates
- Keep actual credentials in `.env` files that are gitignored
- Rotate any credentials that were previously committed
- Use environment variables in your deployment platform (Vercel, etc.)

### Credential Rotation

If sensitive credentials were previously exposed in the repository:

1. **Rotate all exposed credentials immediately:**
   - Generate a new `JWT_SECRET`
   - Rotate database passwords
   - Regenerate Supabase keys
   - Regenerate Vercel tokens

2. **Update your deployment environment:**
   - Update environment variables in Vercel dashboard
   - Update database credentials in Supabase
   - Restart your services

### Deployment

For production deployments:

1. **Vercel:**
   - Add environment variables in the Vercel dashboard
   - Never commit `.env.production` or `.env.vercel` files
   - Use Vercel's environment variable management

2. **Other platforms:**
   - Use platform-specific environment variable configuration
   - Never store credentials in code or tracked files

## Questions?

If you have questions about security setup, please refer to the project documentation or contact the maintainers.
