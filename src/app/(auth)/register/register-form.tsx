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

type FormValue = z.infer<typeof formSchema>;

const formSchema = z.object({
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
});

const RegisterForm = () => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = async (values: FormValue) => {
    console.log("🚀 ~ handleSubmitForm ~ values:", values);
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
                <FormLabel>Username</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Abc123@" {...field} />
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
            <Button type="submit">Đăng ký</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
