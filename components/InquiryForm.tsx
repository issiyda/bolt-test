"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

interface InquiryFormProps {
  inquiry?: {
    id: number;
    name: string;
    email: string;
    message: string;
  };
  onSuccess: () => void;
}

export function InquiryForm({ inquiry, onSuccess }: InquiryFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: inquiry?.name || "",
      email: inquiry?.email || "",
      message: inquiry?.message || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (inquiry) {
      const { error } = await supabase
        .from('inquiries')
        .update(values)
        .eq('id', inquiry.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update inquiry",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Inquiry updated successfully",
        });
        onSuccess();
      }
    } else {
      const { error } = await supabase
        .from('inquiries')
        .insert([values]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create inquiry",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Inquiry created successfully",
        });
        onSuccess();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{inquiry ? "Update" : "Submit"}</Button>
      </form>
    </Form>
  );
}