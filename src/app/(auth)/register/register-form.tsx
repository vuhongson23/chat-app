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
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type FormValue = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    userName: z.string().min(2).max(50),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (values: FormValue) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          userName: values.userName,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("🚀 ~ handleSubmitForm ~ data:", data);
        toast.success("Đăng ký tài khoản thành công!!!");
        form.reset();
        router.push("/message");
      }
    } catch (error) {
      toast.error("Đăng ký tài khoản không thành công!!!");
      setLoading(false);
    } finally {
      setLoading(false);
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
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên người dùng</FormLabel>
                <FormControl>
                  <Input placeholder="Vũ Hồng Sơn" {...field} />
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Abc123@" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Abc123@" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/login"}
            className="inline-block !mt-3 text-sm font-thin hover:underline hover:text-blue-500"
          >
            Bạn đã có tài khoản?
          </Link>
          <div className="flex items-center justify-end !mt-3">
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Đăng ký"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
