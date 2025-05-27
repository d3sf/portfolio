This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update the environment variables in `.env.local` with your Cloudinary credentials:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

To get your Cloudinary credentials:
1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Navigate to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### Running the Development Server

After setting up your environment variables, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Image Upload**: Integrated with Cloudinary for optimized image storage and delivery
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Admin Dashboard**: Content management system for portfolio data

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Cloudinary:

- [Cloudinary Documentation](https://cloudinary.com/documentation) - learn about Cloudinary features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

When deploying to Vercel, make sure to add your Cloudinary environment variables in the Vercel project settings.
