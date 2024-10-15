"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditInquiryDialog from './EditInquiryDialog';
import DeleteInquiryDialog from './DeleteInquiryDialog';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
    } else {
      setInquiries(data || []);
    }
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <Card key={inquiry.id}>
          <CardHeader>
            <CardTitle>{inquiry.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {inquiry.email}</p>
            <p><strong>Message:</strong> {inquiry.message}</p>
            <p><strong>Created at:</strong> {new Date(inquiry.created_at).toLocaleString()}</p>
            <div className="mt-4 space-x-2">
              <EditInquiryDialog inquiry={inquiry} onUpdate={fetchInquiries} />
              <DeleteInquiryDialog inquiryId={inquiry.id} onDelete={fetchInquiries} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}