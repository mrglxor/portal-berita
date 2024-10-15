This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Ini adalah proyek web poral berita untuk tugas magang di [PT. Winnicode Garuda Teknologi](https://winnicode.com/) saya menggunakan nextjs dan mongodb untuk web dan juga [NewsAPI](https://newsapi.org/) provider untuk menjaga berita tetap ada & up to date, dan status proyek ini masih `DEVELOPMENT` karena saya ingin memperbaiki lagi performa dan fitur-fitur nya. untuk semua assets yang sudah saya buat untuk proyek ini sebagai berikut:

### Desaign UI

- [Figma](https://www.figma.com/design/EKt9dN2FVwmvx3hDmm3zWY/UI-Web-Portal-Berita---PORT?node-id=112-103&node-type=frame&t=LFAeT79KyKOI7wr3-0)

### Web Flow

- [Excalidraw](https://excalidraw.com/#json=g7N8Lz6JP13kK2EgiRvTQ,rLEZgxffY_z8mk2aTewMuQ)

## Getting Started

1. clone project:

```bash
git clone https://github.com/mrglxor/portal-berita.git
```

2. cd `portal-berita`

3. install project dependencies:

```bash
npm install
```

4. add `.env` file for variables:

```bash
MONGODB_URI=urlconnection
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
NEWSAPI_API_KEY=apikey
NEWSAPI_AUTHORID=authorid
NEWSAPI_LANGUAGE=id
JWT_SECRET=jwtsecret
```

untuk `development` bisa menggunakan ini:

```bash
MONGODB_URI=mongodb+srv://mongodbdev:mongodbdev@cluster0.cs9io.mongodb.net/portal_berita?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
NEWSAPI_API_KEY=3f16d90f3b2e4a1a900819aed77a0155
NEWSAPI_AUTHORID=66f54cbb62a74089222955c9
NEWSAPI_LANGUAGE=id
JWT_SECRET=f39ac278f1930c82d6fa3c1c2a7b6e73fc55bc734d9bf835f9e7a70b3b071f50b468f5abcf174645d4742a56ed937f67b95e5e2f9e3c17e47b509763d58d9f9b
```

5. run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
