import styled from '@emotion/styled';

export const RecoverPasswordStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    width: 300px;
  }
  p,
  input {
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
  }
  input,
  button {
    width: 100%;
  }
  p {
    font-size: 1.125rem;
  }
  a {
    margin-top: 1rem;
  }
  .reset-password-form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 430px;
    margin: 0 auto;
  }
  .reset-password-form-sent-wrapper {
    max-width: 360px;
    text-align: center;
    p {
      text-align: left;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
    }
  }
  .password-reset-btn {
    padding: 0.625rem 1.25rem;
    font-size: 1.125rem;
  }
`;

export const GhostInput = styled.input`
  padding: 0.5rem 1rem 0.43rem;
  border-radius: 0.375rem;
  border: ${(props) => `1px ${props.theme.inputBorderColor} solid`};
  font-size: 1rem;
`;
