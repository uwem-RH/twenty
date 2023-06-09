import styled from '@emotion/styled';
import { IconPlus } from '@tabler/icons-react';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryBackground};
  color: ${({ theme }) => theme.text40};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  align-self: baseline;
  gap: ${({ theme }) => theme.spacing(1)};

  &:hover {
    background-color: ${({ theme }) => theme.secondaryBackground};
  }
`;

export const NewButton = () => {
  return (
    <StyledButton>
      <IconPlus size={16} />
      New
    </StyledButton>
  );
};