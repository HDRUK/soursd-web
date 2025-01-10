import { StyledInfoBox, StyledAlert, StyledIcon } from "./InfoBox.styles";

interface InfoBoxProps {
  children: React.ReactNode;
  index: number;
}

const InfoBox = ({ children, index }: InfoBoxProps) => {
  return (
    <StyledInfoBox>
      <StyledAlert icon={<StyledIcon>{index}</StyledIcon>}>
        {children}
      </StyledAlert>
    </StyledInfoBox>
  );
};

export default InfoBox;
