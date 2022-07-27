import { useState } from "react";

import FormInput from "../form-input/form-input-component";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signUserWithEmailAndPassword
} from "../../utils/firebase/firebase";

import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

import "./sign-in-form.style.scss";


const signInWithGoogle = async () => {
  await signInWithGooglePopup();
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
    console.log({ formFields });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetFormField = ()=>{
      setformFields(defaultFormFields)
    }

    try {
      const {user} = await signUserWithEmailAndPassword(email, password)
      resetFormField()

    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an Account?</h2>
      <span>Sign In with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type = "button" buttonType="google" onClick={()=> signInWithGoogle()}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
