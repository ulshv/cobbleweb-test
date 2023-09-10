import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  margin: 150px auto;
`;

const Centered = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

export default Centered;
