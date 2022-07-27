import { useState } from "react";
import FormInput from "../form-input/form-input-component";
import "./sign-up-form.style.scss"
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import Button from '../button/button.component'



const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
    console.log({ formFields });

   
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("password do not match");
      return;
    }
    const resetFormField = ()=>{
      setformFields(defaultFormFields)
    }

    try {
      const {user} =  await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField()
    } catch (error) {
      console.log(error);
      if (error.code == "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      if (error.code == "auth/weak-password") {
        alert("Cannot create user, Weak Password");
      } else {
        console.log("user creation has encountered an error - ", error);
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an Account?</h2>
      <span>Sign up with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
        label= 'Display Names'
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />
        <FormInput
        label= 'Email'
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
        label= 'Password'
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <FormInput
        label= 'Confirm Password'
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
