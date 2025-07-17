'use client';

import dynamic from 'next/dynamic';

const ClientOnlyDashboard = dynamic(
  () => import('@/components/ClientOnlyDashboard'),
  { ssr: false }
);

export default function Page() {
  return <ClientOnlyDashboard />;
}