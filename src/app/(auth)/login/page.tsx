import LoginForm from "@/app/(auth)/login/login-form";

const LoginPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-[520px] bg-white rounded-lg shadow-md p-4">
        <h1 className="text-center font-bold text-xl mb-2">Welcome back!!!</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
