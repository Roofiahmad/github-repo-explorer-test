import { Typography } from "@mui/material";
import styled from "styled-components";

interface InputStyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: "true" | "false";
  errorMessage?: string;
  placeholder?: string;
}

const Input = styled.input<{ error?: "true" | "false" }>`
  background-color: #eeeeee;
  border: ${({ error }) => (error == "true" ? "rgb(244, 67, 54);" : "none")};
  height: 37px;
  padding: 0.375rem 0.75rem;
  width: auto;
  width: calc(100% - 1.5rem);
`;

const InputStyled = ({
  error,
  onChange,
  errorMessage,
  placeholder,
  ...restProps
}: InputStyledProps) => {
  return (
    <>
      <Input
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
      {error == "true" && (
        <Typography variant="subtitle2" color="rgb(244, 67, 54);">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default InputStyled;
