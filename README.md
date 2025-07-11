This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. Clone the Repo
   
```
git clone https://github.com/your-username/personal-finance-visualizer.git

cd personal-finance-visualizer
```

2. Install Dependencies
```   
npm install
```
4. Configure MongoDB
 ```
Create .env.local file:
MONGODB_URI=your_mongo_connection_string
```
5. Run Locally
```
npm run dev
```
API Testing with Postman

- GET /api/transactions
- POST /api/transactions
- PUT /api/transactions/:id
- DELETE /api/transactions/:id

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Tech Stack
```
- Frontend: Next.js (App Router), React, TailwindCSS, shadcn/ui
- Charts: Recharts
- Forms & Validation: react-hook-form + zod
- Backend: Next.js API Routes
- Database: MongoDB with Mongoose
- Deployment: Vercel
```
Features
```
Stage 1: Transaction Dashboard
- Add/Edit/Delete transactions (amount, date, description)
- View monthly expenses (bar chart)
- See category-wise breakdown (pie chart)
- Recent transactions + total expenses summary
```

```
Stage 2: Categories
- Predefined category selection for each transaction
- Category-wise pie chart
- Dashboard summary cards
```

```
Stage 3: Budgeting
- Set monthly budgets per category
- Budget vs Actual spend bar chart
- Color-coded insights (Under/Over Budget)
- Edit/Delete budget entries
```














## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
