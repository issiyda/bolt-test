import InquiryList from '@/components/InquiryList';
import CreateInquiryButton from '@/components/CreateInquiryButton';

export default function InquiriesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Inquiries</h1>
      <CreateInquiryButton />
      <InquiryList />
    </div>
  );
}