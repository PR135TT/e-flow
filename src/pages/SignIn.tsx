
import { SignInHeader } from "@/components/auth/SignInHeader";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpFooter } from "@/components/auth/SignUpFooter";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignInHeader />

      {/* Sign In Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Your Account</h1>
          <SignInForm />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignIn;
