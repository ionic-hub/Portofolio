# Setup Instructions for EmailJS

To make the contact form work and send emails to your inbox, follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New message from {{from_name}} - {{subject}}

**Content:**
\`\`\`
Hello Irene,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
\`\`\`

4. Save the template and note down your **Template ID**

## 4. Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (User ID)

## 5. Update the Code
Replace these values in `scripts/contact.js`:

\`\`\`javascript
// Replace these with your actual values:
emailjs.init('YOUR_PUBLIC_KEY');           // Your Public Key
'YOUR_SERVICE_ID',                         // Your Service ID  
'YOUR_TEMPLATE_ID',                        // Your Template ID
\`\`\`

## 6. Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox

## Example Configuration
\`\`\`javascript
emailjs.init('user_abc123def456');
emailjs.sendForm('service_gmail', 'template_contact', contactForm)
\`\`\`

That's it! Your contact form will now send emails directly to your inbox.
