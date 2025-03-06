import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: white;
  padding: 32px;
  borderRadius: 2;
  margin-bottom: 16px;
`;

export const InstructionText = styled(Typography)`
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;