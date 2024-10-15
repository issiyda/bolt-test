import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Inquiry Management System</h1>
      <Link href="/inquiries">
        <Button>View Inquiries</Button>
      </Link>
    </div>
  );
}