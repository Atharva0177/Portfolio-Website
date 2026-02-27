# 📧 Contact Form Setup Guide

This guide will help you set up the contact form so it sends emails directly to your inbox instead of opening Outlook.

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free Web3Forms Access Key

1. Open your browser and go to **[https://web3forms.com/](https://web3forms.com/)**

2. Enter your email address (where you want to receive contact form submissions)

3. Click the **"Get Access Key"** button

4. **IMPORTANT**: Check your email inbox for a verification email from Web3Forms

5. **Click the verification link** in the email to activate your access key

6. After verification, **copy the access key** shown on the screen (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

> ⚠️ **Critical Step**: You MUST verify your email by clicking the link sent to you. The access key will not work until you complete email verification!

### Step 2: Create Environment File

1. In the root folder of your project, locate the file `.env.local.example`

2. Copy it and rename to `.env.local`:
   ```bash
   # On Windows (PowerShell)
   Copy-Item .env.local.example .env.local

   # On Mac/Linux
   cp .env.local.example .env.local
   ```

### Step 3: Add Your Access Key

1. Open the `.env.local` file in your code editor

2. Find the line:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
   ```

3. Replace `your_web3forms_access_key_here` with the access key you copied from Web3Forms:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

4. **Save the file**

### Step 4: Restart Your Server

If your development server is running, **restart it**:

1. Stop the server (Press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 5: Test Your Contact Form

1. Open your website at [http://localhost:3000](http://localhost:3000)

2. Scroll down to the **"Get In Touch"** section

3. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message

4. Click **"Send Message"**

5. You should see a green success message: ✓ "Message sent successfully!"

6. **Check your email inbox** (the email you used to register with Web3Forms) - you should have received the test message!

## ✅ That's It!

Your contact form is now fully functional and will send all submissions directly to your email inbox!

## 🎨 How It Works

1. **User fills out the form** on your website
2. **Form data is sent directly** from the browser to Web3Forms API
3. **Web3Forms sends** the email to your inbox  
4. **User sees** a success message

> **Note**: The form submits directly from the browser to Web3Forms, not through a backend API. This prevents issues with Cloudflare bot protection and ensures reliable delivery.

## 📧 What You'll Receive

When someone submits the contact form, you'll receive an email with:
- **From**: The sender's name and email
- **Subject**: The subject they entered
- **Message**: Their full message
- **Reply-to**: Set to the sender's email (so you can reply directly)

## 🛠️ Troubleshooting

### Form shows "Failed to send message" or "403 Error"
**Most Common Issue**: Your Web3Forms access key hasn't been verified yet.

**Solution**:
1. Check your email inbox (and spam folder) for an email from Web3Forms
2. Look for a message with subject like "Verify your Web3Forms account" or "Confirm your access key"
3. Click the verification link in that email
4. Wait for confirmation that your email is verified
5. Make sure you're using the verified access key in your `.env.local` file
6. Restart your development server: Stop with `Ctrl+C` and run `npm run dev` again
7. Try submitting the form again

### Form shows "access key is invalid"
- Check that your `.env.local` file exists in the root folder
- Verify the access key is correct (no extra spaces or line breaks)
- Make sure the variable name is exactly: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Ensure you've verified your email with Web3Forms
- Try generating a new access key from Web3Forms if the issue persists

### Not receiving emails
- Check your spam/junk folder
- Verify the email address you used to register with Web3Forms
- Make sure the email address is correct in your Web3Forms dashboard

### Form opens Outlook instead
- This means the environment variable isn't being loaded
- Double-check the file is named `.env.local` (with a leading dot)
- Ensure the variable name is exactly: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Restart your development server

## 🔒 Security Notes

- The `NEXT_PUBLIC_` prefix means this key is safe to use in the browser
- Web3Forms provides spam protection and rate limiting
- Your email address is never exposed to users
- All submissions are logged in your Web3Forms dashboard

## 💡 Pro Tips

1. **Customize Email Notifications**: Visit your Web3Forms dashboard to customize how emails are formatted

2. **Spam Protection**: Web3Forms includes built-in spam protection with honeypot fields

3. **Submission Tracking**: Log in to Web3Forms dashboard to see all form submissions

4. **Multiple Forms**: You can create multiple access keys for different websites

5. **Email Templates**: Customize the email template in the Web3Forms dashboard

## 📱 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variable in your hosting platform's settings:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Environment Variables

2. Add the key:
   - **Key**: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value**: Your Web3Forms access key

3. Redeploy your site

## 🆓 Web3Forms Limits

**Free Plan Includes**:
- ✅ Unlimited forms
- ✅ 250 submissions per month
- ✅ Spam filtering
- ✅ Email notifications
- ✅ File uploads (up to 5MB)
- ✅ Custom redirects
- ✅ API access

**Need more?** Upgrade to a paid plan at [https://web3forms.com/pricing](https://web3forms.com/pricing)

## 📚 Additional Resources

- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Web3Forms Dashboard](https://web3forms.com/dashboard)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Need Help?** Open an issue in the repository or contact support at [https://web3forms.com/](https://web3forms.com/)
