"use client";
import React from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { Loader } from "@progress/kendo-react-indicators";
import { Icon, SvgIcon } from "@progress/kendo-react-common";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import Logo from "@/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyMFALoginMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

// Define our own digit regex instead of using REGEXP_ONLY_DIGITS from input-otp
const DIGITS_REGEX = /^\d+$/;

const VerifyMfa = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFALoginMutationFn,
  });

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!email) {
      router.replace("/");
      return;
    }
    const data = {
      code: values.pin,
      email: email,
    };
    mutate(data, {
      onSuccess: (response) => {
        router.replace("/dashboard");
        toast({
          title: "Success",
          description: response?.data?.message,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  // Create refs for each input field to handle focus movement
  const inputRefs = Array(6).fill(0).map(() => React.useRef<any>(null));
  
  // Handle input change to move focus to next field
  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !DIGITS_REGEX.test(value)) {
      return;
    }
    
    // Update form value by combining all input values
    const currentPin = form.getValues().pin.split('');
    currentPin[index] = value;
    form.setValue('pin', currentPin.join(''));
    
    // Move focus to next input if value exists
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace to move focus to previous field
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !form.getValues().pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center">
      <div className="w-full h-full p-5 rounded-md">
        <Logo />

        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mt-8
        text-center sm:text-left"
        >
          Multi-Factor Authentication
        </h1>
        <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
          Enter the code from your authenticator app.
        </p>

        <div className="mt-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-6 flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm mb-1 font-normal dark:text-[#f1f7feb5]">
                One-time code
              </label>
              
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <React.Fragment key={index}>
                    {index === 2 || index === 4 ? (
                      <>
                        <div className="flex items-center px-1">
                          <span className="text-gray-300">-</span>
                        </div>
                        <Controller
                          control={form.control}
                          name="pin"
                          render={({ field }) => (
                            <Input
                              ref={inputRefs[index]}
                              value={field.value[index] || ''}
                              onChange={(e) => handleInputChange(index, e.value as string)}
                              onKeyDown={(e) => handleKeyDown(index, e.nativeEvent as any)}
                              maxLength={1}
                              type="text"
                              className="!w-14 !h-12 !text-lg text-center"
                              style={{ fontSize: '1.25rem' }}
                            />
                          )}
                        />
                      </>
                    ) : (
                      <Controller
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <Input
                            ref={inputRefs[index]}
                            value={field.value[index] || ''}
                            onChange={(e) => handleInputChange(index, e.value as string)}
                            onKeyDown={(e) => handleKeyDown(index, e.nativeEvent as any)}
                            maxLength={1}
                            type="text"
                            className="!w-14 !h-12 !text-lg text-center"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {form.formState.errors.pin && (
                <Error className="text-red-500 text-xs mt-1">
                  {form.formState.errors.pin.message}
                </Error>
              )}
            </div>
            
            <Button
              themeColor="primary"
              size="large"
              disabled={isPending}
              className="w-full h-[40px] mt-2"
              type="submit"
              endIcon={<SvgIcon icon={arrowRightIcon} />}
            >
              {isPending && <Loader size="small" type="pulsing" className="mr-2" />}
              Continue
            </Button>
          </form>
        </div>

        <Button 
          fillMode="flat"
          className="w-full text-[15px] mt-2 h-[40px]"
          onClick={() => router.replace('/signin')}
        >
          Return to sign in
        </Button>
      </div>
    </main>
  );
};

export default VerifyMfa;