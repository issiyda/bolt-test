"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface DeleteInquiryDialogProps {
  inquiryId: number;
  onDelete: () => void;
}

export default function DeleteInquiryDialog({ inquiryId, onDelete }: DeleteInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', inquiryId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      });
      onDelete();
    }
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the inquiry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}