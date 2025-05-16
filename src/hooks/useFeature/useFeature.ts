import { FEATURES } from "@/config/features";
import { Features } from "../../types/roles";
import { isRoleValid } from "@/utils/roles";
import { useEffect, useState } from "react";

export default function useFeature(id: keyof Features) {
  const { permissions, enabled } = FEATURES[id];
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsAllowed(isRoleValid(permissions));
  }, [id]);

  return { isAllowed, enabled };
}
