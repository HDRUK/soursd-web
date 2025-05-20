import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from "uuid";
import { StyledListItem, StyledListItemText } from "./CheckboxList.styles";

const SkeletonCheckboxList = ({ n = 4 }: { n?: number }) => (
  <>
    {[...Array(n)].map(() => (
      <StyledListItem key={`item${uuidv4()}`}>
        <Skeleton variant="rectangular" width={20} height={20} />
        <StyledListItemText
          primary={
            <Skeleton
              width={Math.floor(Math.random() * 150) + 100}
              height={25}
            />
          }
          secondary={
            <Skeleton
              width={Math.floor(Math.random() * 500) + 200}
              height={16}
            />
          }
        />
      </StyledListItem>
    ))}
  </>
);

export default SkeletonCheckboxList;
