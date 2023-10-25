import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import RegisterForm from "@/components/form/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default Register;
