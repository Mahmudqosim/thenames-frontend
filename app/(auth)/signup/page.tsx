"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { Loader } from "@progress/kendo-react-indicators";
import { Icon, SvgIcon } from "@progress/kendo-react-common";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import Logo from "@/components/logo";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: "Name is required",
      }),
      email: z.string().trim().email().min(1, {
        message: "Email is required",
      }),
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().min(1, {
        message: "Confirm Password is required",
      }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const FormField = ({ name, label, type = "text", placeholder }: { name: keyof z.infer<typeof formSchema>, label: string, type?: string, placeholder?: string }) => {
    return (
      <div className="mb-4">
        <Controller
          control={form.control}
          name={name}
          render={({ field, fieldState }) => (
            <div>
              <label className="block dark:text-[#f1f7feb5] text-sm font-medium mb-1">
                {label}
              </label>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                valid={!fieldState.error}
                className="w-full"
              />
              {fieldState.error && (
                <Error className="text-red-500 text-xs mt-1">{fieldState.error.message}</Error>
              )}
            </div>
          )}
        />
      </div>
    );
  };

  return (
    <>
      <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
        {!isSubmitted ? (
          <div className="w-full p-5 rounded-md">
            <Logo />

            <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
              Create an account
            </h1>
            <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
              Already have an account?{" "}
              <Link className="text-blue-500" href="/signin">
                Sign in
              </Link>
              .
            </p>
            
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                name="name" 
                label="Name" 
                placeholder="Name" 
              />
              
              <FormField 
                name="email" 
                label="Email" 
                placeholder="email@gmail.com" 
              />
              
              <FormField 
                name="password" 
                label="Password" 
                type="password"
                placeholder="••••••••••••" 
              />
              
              <FormField 
                name="confirmPassword" 
                label="Confirm Password" 
                type="password"
                placeholder="••••••••••••" 
              />
              
              <Button
                themeColor="primary"
                size="large"
                className="w-full h-[40px] bg-blue-500 text-white font-semibold mt-2"
                disabled={isPending}
                endIcon={<SvgIcon icon={arrowRightIcon} />}
                type="submit"
              >
                {isPending && (
                  <Loader size="small" type="pulsing" className="mr-2" />
                )}
                Create account
              </Button>
            </form>
            
            <p className="text-xs font-normal mt-4">
              By signing up, you agree to our{" "}
              <a className="text-blue-500 hover:underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-blue-500 hover:underline" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="animate-bounce"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link href="/">
              <Button themeColor="primary" className="h-[40px]">
                Go to login
                <SvgIcon icon={arrowRightIcon} />
              </Button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}