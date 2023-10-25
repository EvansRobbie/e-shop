import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import LoginForm from "@/components/form/LoginForm";
import React from "react";

const page = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
};

export default page;
