import { Features } from "@/types/roles";
import { useEffect, useState } from "react";
import { FEATURES } from "../../config/features";
import { isRoleValid } from "../../utils/roles";

export default function useFeature(id: keyof Features) {
  const { permissions, enabled } = FEATURES[id];
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsAllowed(isRoleValid(permissions));
  }, [id]);

  return { isAllowed, enabled };
}
