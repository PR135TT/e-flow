
import { SignUpHeader } from "@/components/auth/SignUpHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignUpFooter } from "@/components/auth/SignUpFooter";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignUpHeader />

      {/* Sign Up Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
          <SignUpForm />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignUp;
