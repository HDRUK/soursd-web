import {
  StyledListInfoItem,
  StyledAlert,
  StyledIcon,
} from "./ListInfoItem.styles";

interface ListInfoItemProps {
  children: React.ReactNode;
  index: number;
}

const ListInfoItem = ({ children, index }: ListInfoItemProps) => {
  return (
    <StyledListInfoItem>
      <StyledAlert icon={<StyledIcon>{index}</StyledIcon>}>
        {children}
      </StyledAlert>
    </StyledListInfoItem>
  );
};

export default ListInfoItem;
