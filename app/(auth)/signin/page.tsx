"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@progress/kendo-react-buttons"
import { Input } from "@progress/kendo-react-inputs"
import { Error } from "@progress/kendo-react-labels"
import { Loader } from "@progress/kendo-react-indicators"
import { Icon, SvgIcon } from "@progress/kendo-react-common"
import { arrowRightIcon } from "@progress/kendo-svg-icons"
import Logo from "@/components/logo"
import { loginMutationFn } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function Login() {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  })

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.data.mfaRequired) {
          router.replace(`/verify-mfa?email=${values.email}`)
          return
        }
        router.replace(`/dashboard`)
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  const FormField = ({
    name,
    label,
    type = "text",
    placeholder,
  }: {
    name: keyof z.infer<typeof formSchema>
    label: string
    type?: string
    placeholder?: string
  }) => {
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
                <Error className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </Error>
              )}
            </div>
          )}
        />
      </div>
    )
  }

  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      <div className="w-full h-full p-5 rounded-md">
        <Logo />

        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
          Log in to Thenames
        </h1>
        <p className="mb-8 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
          Don't have an account?{" "}
          <Link className="text-blue-500" href="/signup">
            Sign up
          </Link>
          .
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Email" placeholder="email@gmail.com" />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••••••"
          />

          <div className="mb-4 flex w-full items-center justify-end">
            <Link
              className="text-sm dark:text-white"
              href={`/forgot-password?email=${form.getValues().email}`}
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            themeColor="primary"
            size="large"
            className="w-full h-[40px] bg-blue-500 text-white font-semibold"
            disabled={isPending}
            type="submit"
            endIcon={<SvgIcon icon={arrowRightIcon} />}
          >
            {isPending && (
              <Loader size="small" type="pulsing" className="mr-2" />
            )}
            Sign in
          </Button>
        </form>

        <p className="text-xs dark:text-slate- font-normal mt-7">
          By signing in, you agree to our{" "}
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
    </main>
  )
}
