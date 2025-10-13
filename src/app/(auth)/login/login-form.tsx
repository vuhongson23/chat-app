"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type FormValue = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must hava at least 8 characters")
    .regex(
      new RegExp(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      ),
      "Password must hava at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number or special character "
    ),
});

const LoginForm = () => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (values: FormValue) => {
    try {
      setLoading(true);
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      console.log("🚀 ~ handleSubmitForm ~ response:", response);
      if (response.status === 200) {
        toast.success("Đăng nhập thành công!!!");
        const data = await response.json();
        console.log("🚀 ~ handleSubmitForm ~ data:", data);
        form.reset();
        setLoading(false);
        router.push("/message");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmitForm ~ error:", error);
      setLoading(false);
      toast.error("Đã có lỗi xảy ra!!!");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc123@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Abc123@" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/register"}
            className="inline-block !mt-3 text-sm font-thin hover:underline hover:text-blue-500"
          >
            Bạn chưa có tài khoản?
          </Link>
          <div className="flex items-center justify-end !mt-3">
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Đăng nhập"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
