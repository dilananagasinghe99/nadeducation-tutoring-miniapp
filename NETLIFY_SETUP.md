# Netlify Forms Setup Guide

Your expression of interest form is now configured to work with Netlify Forms! 🎉

## What's Been Done

✅ Added Netlify form attributes to the contact form
✅ Added spam protection (honeypot field)
✅ Created a success page for after form submission
✅ Updated JavaScript to work with Netlify Forms

## How to Deploy on Netlify

### Option 1: Deploy from Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Netlify Forms"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider and repository
   - Click "Deploy site"

3. **That's it!** Netlify will automatically:
   - Detect the form
   - Enable form submissions
   - Send you email notifications

### Option 2: Drag & Drop Deploy

1. **Go to Netlify**
   - Visit [app.netlify.com/drop](https://app.netlify.com/drop)
   
2. **Drag your project folder**
   - Drag the entire `math-tutoring-website` folder onto the page
   
3. **Done!** Your site is live with working forms

## Configuring Form Notifications

After deployment:

1. Go to your site dashboard on Netlify
2. Click **Site settings** → **Forms**
3. Click **Form notifications**
4. Add notification recipients:
   - **Email**: nagasinghehw@gmail.com
   - You can add multiple email addresses
   - You can also set up Slack/webhook notifications

## Testing the Form

### Local Testing (Before Deploy)
The form will show an error when tested locally because Netlify Forms only work on Netlify-hosted sites. To test locally:
- All validation will work
- Form will show "Form not found" error on submission (this is normal)

### After Deploy
1. Visit your live site
2. Fill out the expression of interest form
3. Submit - you should be redirected to the success page
4. Check your email for the form submission notification from Netlify

## Form Data Management

**View Submissions:**
- Netlify Dashboard → Your Site → Forms → expression-of-interest
- You can see all submissions, export as CSV, and manage spam

**Email Notifications:**
- Configure in: Forms → Form notifications → Email notification
- Add multiple recipients if needed

**Spam Protection:**
- Netlify automatically filters spam
- Honeypot field catches simple bots
- You can enable reCAPTCHA if needed

## Custom Domain Setup

Once deployed, you can connect your custom domain:

1. Buy domain: `nadeducation.com.au`
2. In Netlify Dashboard:
   - Site settings → Domain management
   - Click "Add custom domain"
   - Follow DNS configuration instructions

## Free Tier Limits

Netlify Forms free tier includes:
- ✅ 100 submissions per month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ CSV export

Need more? Upgrade plans available if you exceed limits.

## Troubleshooting

**Form not detected?**
- Make sure `data-netlify="true"` attribute is present
- Check that `name="expression-of-interest"` is set
- Redeploy the site

**Not receiving emails?**
- Check spam folder
- Verify email in Form notifications settings
- Check submissions in Netlify dashboard

**Form shows error on local testing?**
- This is normal - Netlify Forms only work on deployed sites
- Deploy to Netlify to test properly

## Support

- Netlify Docs: https://docs.netlify.com/forms/setup/
- Netlify Support: https://www.netlify.com/support/

---

**Your form is ready to go live! Just deploy to Netlify and start receiving enquiries.** 🚀
