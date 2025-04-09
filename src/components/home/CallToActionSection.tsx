
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CallToActionSection = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = (action: string) => {
    if (action === "Sign Up") {
      navigate('/signup');
    } else if (action === "Sign In") {
      navigate('/signin');
    }
  };

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust Euron Estate for reliable Nigerian real estate data
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-6"
            onClick={() => handleButtonClick("Sign Up")}
          >
            Sign Up Now
          </Button>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
            onClick={() => handleButtonClick("Sign In")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  );
};
