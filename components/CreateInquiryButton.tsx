"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InquiryForm } from './InquiryForm';

export default function CreateInquiryButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Create New Inquiry</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inquiry</DialogTitle>
        </DialogHeader>
        <InquiryForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}