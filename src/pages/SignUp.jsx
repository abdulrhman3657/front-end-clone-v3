import { useState } from "react";
import SignUpFirstStep from "../Component/SignUpFirstStep";
import SignUpSecondStep from "../Component/SignUpSecondStep";
import { signUp } from "../services/auth.service";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { SlArrowLeft } from "react-icons/sl";
const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    role: "founder",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    country: "",
    city: "",
  });
  const navigate = useNavigate();
  const goNext = () => setStep(step + 1);
  const goBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Password mismatch",
          text: "Please make sure both passwords match.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      const data = await signUp(formData);
      console.log("Sending signup data:", formData);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Signup successful!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      console.log(data)
      navigate("/allIdeas");
    } catch (err) {
        console.error("Signup failed:", err);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Signup failed",
          text: err.response?.data?.message || "Something went wrong.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });    
    }
  };

  return (
    <>
    <div className="">
           <Link
             to="/"
             className="inline-flex items-center justify-start text-blue-500 hover:underline"
           >
             <SlArrowLeft className="mr-1" /> Back
           </Link>
         </div>

      {step === 1 && (
        <SignUpFirstStep formData={formData} setFormData={setFormData} onNext={goNext} />
      )}
      {step === 2 && (
        <>
          <SignUpSecondStep
            formData={formData}
            setFormData={setFormData}
            onBack={goBack}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default SignUpForm;
