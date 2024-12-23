![MVP Minutes](https://i.ibb.co/drS740V/Screenshot-2024-12-23-at-10-30-49.png)

# mvp-minutes

This is a nextjs SaaS project.

# What is included

- Nextjs 14 App Router
- Neon Postgres database with Drizzle ORM
- Tailwind CSS - with shadcn/ui
- All social media authentication methods (Google, Github, Apple, Facebook, Twitter) using Clerk
- Lemon Squeezy Subscription payment gateway
- Resend Email
- SEO Optimized using next-seo
- Object Storage using AWS S3
- Blogging Platform with SEO Optimized using Next.js Blog
- Beautiful Dashboard, Landing Page, Pricing Page with Tailwind CSS and shadcn/ui
- Gemini LLM for LLM integration
- Anthropic LLM for LLM integration
- Admin Page with authentication

# Coming Soon features

- Image Generation
- 11 Labs integration
- Docker support for easy deployment
- Site Analytics with Google Analytics
- Error Handling with Sentry
- OpenAI integration for Text to Speech and Speech to Text with advanced voice cloning
- CMS for easy content management (blogs)

And many more features to come.

## Note

The separate documentaion is comming soon for this project.

# What you need to use MVP Minutes

- Nodejs 18 or above installed on your machine
- Clerk Account with project created (Free)
- AWS Account (Can use free tier)
- Lemon Squeezy Account (Free)
- Resend Account (Free)

## Getting Started

1. First, clone the repository:

```bash
git clone https://github.com/Hashith00/mvp-minutes.git
```

2. Then, install the dependencies:

```bash
npm install
```

Rename the `.env.example` file to `.env` and add values to the environment variables.

3. Database migration:

```bash
npm run push
```

4. Lemon Squeezy setup:

Create a new subscription plan before building the project.
Then, run the development server:

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Clerk Webhook

To create a webhook in Clerk, you need to add the webhook URL to the Clerk dashboard.

The webhook URL is `https://your-nextjs-app-url/api/webhooks/clerk`.

The webhook secret is `webhook-secret`.

Read more about Clerk webhooks [here](https://clerk.com/docs/webhooks/sync-data).

## Tips for LemonSqueezy

- First create subscription plans in Lemon Squeezy.
- Then get the API key from the Lemon Squeezy dashboard.
