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

interface EditInquiryDialogProps {
  inquiry: {
    id: number;
    name: string;
    email: string;
    message: string;
  };
  onUpdate: () => void;
}

export default function EditInquiryDialog({ inquiry, onUpdate }: EditInquiryDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Inquiry</DialogTitle>
        </DialogHeader>
        <InquiryForm
          inquiry={inquiry}
          onSuccess={() => {
            setOpen(false);
            onUpdate();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}