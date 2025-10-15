# Casa Sueño Deployment Guide

## 🚀 Production Deployment Checklist

### 1. DNS Configuration (One.com)

**Domain:** casa-sueno.com

Login to One.com → DNS Management → Add these records:

```
Type: A Record
Name: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME Record
Name: www
Value: cname.vercel-dns.com
TTL: Automatic
```

⚠️ **Remove any existing A/CNAME records for @ and www first!**

---

### 2. Vercel Domain Setup

1. Go to **Vercel Dashboard** → Your casa-sueno project
2. **Settings** → **Domains**
3. Add these domains:
   - `casa-sueno.com` (Primary)
   - `www.casa-sueno.com` (Redirect to primary)

4. Wait 5-10 minutes for DNS propagation

---

### 3. Resend Email Domain Verification

**Using your Resend account with casa-sueno.com domain:**

1. **Resend Dashboard** → **Domains** → **Add Domain**
2. Enter: `casa-sueno.com`
3. Copy the DNS records Resend provides

4. **Go back to One.com DNS** and add:

```
Type: TXT
Name: @ (or casa-sueno.com)
Value: [Resend verification string]

Type: MX
Name: @
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; [rest from Resend]

Type: TXT
Name: [Resend provides DKIM record name]
Value: [DKIM key from Resend]
```

5. **Verify domain** on Resend (wait 10-30 minutes)

6. **Create email address:**
   - Go to Resend → **Email Addresses**
   - Create: `info@casa-sueno.com`

---

### 4. Vercel Environment Variables

Go to **Vercel** → **Project Settings** → **Environment Variables**

Add these (copy from `.env.local`):

| Variable Name                   | Value                                      | Environment |
| ------------------------------- | ------------------------------------------ | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://vrsaehlthpojsdgwaxtk.supabase.co` | Production  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `[Your Supabase anon key]`                 | Production  |
| `ADMIN_PASSWORD_HASH`           | `[Your bcrypt hash]`                       | Production  |
| `JWT_SECRET`                    | `[Your JWT secret]`                        | Production  |
| `RESEND_API_KEY`                | `re_RuY4NKta_CpXYPAqLyhpqbAXQNupmHtRH`     | Production  |
| `EMAIL_FROM`                    | `info@casa-sueno.com`                      | Production  |
| `EMAIL_TO`                      | `info@casa-sueno.com`                      | Production  |

---

### 5. Revolut Bank Details - ✅ COMPLETED

**Bank details already added to the system:**

```
Beneficiary: AMBER VAN GEERT
IBAN: ES44 1583 0001 1290 9729 5996
BIC/SWIFT: REVOESM2
Bank: Revolut Bank UAB
Address: Calle Príncipe de Vergara 132, 4 planta, 28002, Madrid, Spain
Currency: EUR
```

These details are now included in all payment instruction emails sent to guests.

---

### 6. Deploy to Production

```bash
# 1. Commit all changes
git add .
git commit -m "Production ready: Updated email to info@casa-sueno.com and DNS config"

# 2. Push to GitHub main branch
git push origin main

# 3. Vercel will auto-deploy
# Monitor at: https://vercel.com/your-username/casa-sueno
```

---

### 7. Post-Deployment Testing

1. **Visit:** https://casa-sueno.com
2. **Test booking flow:**
   - Select dates
   - Fill in contact details
   - Submit booking
   - Check email receipt at `info@casa-sueno.com`
3. **Test admin panel:**
   - Go to `/en/admin` or `/nl/admin`
   - Login with admin credentials
   - Mark test booking as paid
   - Verify confirmation email sent
4. **Test language switching:**
   - English: `/en`
   - Dutch: `/nl`

---

### 8. Monitor & Maintain

**Vercel Dashboard:**

- Monitor deployments
- Check analytics
- View function logs

**Resend Dashboard:**

- Monitor email delivery
- Check email logs
- Track open rates

**Supabase Dashboard:**

- Monitor database usage
- Check booking data
- Review API calls

---

## 🔒 Security Checklist

- ✅ All environment variables in Vercel
- ✅ `.env.local` in `.gitignore` (never committed)
- ✅ Admin password hashed with bcrypt
- ✅ JWT secret is strong random string
- ✅ CORS and CSP headers configured in middleware
- ✅ Supabase RLS policies enabled

---

## 📧 Email Configuration Summary

**Domain:** casa-sueno.com  
**From Address:** info@casa-sueno.com  
**To Address:** info@casa-sueno.com  
**Provider:** Resend (your account)  
**SMTP:** feedback-smtp.us-east-1.amazonses.com

**Email Templates:**

1. **Payment Instructions** (sent on booking)
2. **Owner Notification** (sent on booking)
3. **Booking Confirmation** (sent when marked as paid)

---

## 🌐 URLs

- **Production:** https://casa-sueno.com
- **Admin Panel:** https://casa-sueno.com/en/admin
- **Vercel:** https://vercel.com/your-username/casa-sueno
- **GitHub:** https://github.com/Ulvounth/casa-sueno

---

## 🆘 Troubleshooting

**DNS not working?**

- Wait 24-48 hours for full propagation
- Use https://dnschecker.org to verify

**Emails not sending?**

- Check Resend domain verification
- Verify DNS records on One.com
- Check Resend logs for errors

**Booking not working?**

- Check Vercel function logs
- Verify Supabase connection
- Test locally first with `npm run dev`

---

**Last Updated:** October 14, 2025
