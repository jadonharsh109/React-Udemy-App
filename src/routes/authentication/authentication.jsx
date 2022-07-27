import "./authentication.style.scss"
import SignUpForm from "../../components/sign-up-form/signup.component";
import SignInForm from "../../components/sign-in-form/signin.component";

const Authentication = () => {

  return (
    <div className="authentication-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default Authentication;
