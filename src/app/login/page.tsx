import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import LoginForm from "@/components/form/LoginForm";
import React from "react";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default page;
