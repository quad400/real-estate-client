"use client";

import ImageUpload from "@/components/image-upload";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ButtonPrimary from "@/components/button-primary";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product Name is required",
  }),
  image: z.string().min(1, {
    message: "Product Image is required",
  }),
  size: z.string().min(1, {
    message: "Product Size is required",
  }),
  price: z.string().min(1, {
    message: "Product Price is required",
  }),
  details: z.string(),
});

const Page = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      size: "",
      price: "",
      details: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/products", values);
      toast.success("Product created successfully")
      router.refresh();
      form.reset()
    } catch (error: any) {
      toast.error(error.response.data)
    }
  };

  return (
    <div className="w-full h-full container mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col justify-start items-start max-w-2xl">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col space-y-4 mt-4 w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Product Name"
                          className="w-full text-sm shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full gap-4 flex justify-start items-center">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            type="text"
                            placeholder="Size"
                            className="w-full text-sm shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            type="number"
                            placeholder="Price"
                            className="w-full text-sm shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isLoading}
                          placeholder="Product Details"
                          className="w-full min-h-[150px] text-sm shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:justify-end sm:items-end w-full sm:w-auto my-6">
            <Button
              size="lg"
              className="bg-primary-dark hover:bg-primary-dark/90 rounded-xl w-full sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
