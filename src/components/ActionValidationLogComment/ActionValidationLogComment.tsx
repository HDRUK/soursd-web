import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserQuery } from "@/services/users";
import { getDaysSince } from "@/utils/date";
import { capitaliseFirstLetter } from "@/utils/string";
import { Comment } from "@/types/logs";
import { useTranslations } from "next-intl";

interface ActionValidationLogCommentProps {
  comment: Comment;
}

const NAMESPACE_TRANSLATION_ACTION_COMMENT = "ActionValidationLogComment";

const ActionValidationLogComment = ({
  comment,
}: ActionValidationLogCommentProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_COMMENT);
  const { id, user_id, comment: text, updated_at } = comment;
  const { data: userData } = useQuery(getUserQuery(user_id as number));

  const { first_name, last_name, user_group } = userData?.data || {};

  return (
    <div key={`validation_log_comment${id}`}>
      <Typography sx={{ fontWeight: "bold" }}>
        {first_name} {last_name} (
        {capitaliseFirstLetter(user_group?.toLowerCase().slice(0, -1) || "")}),{" "}
        {t("daysSince", { days: getDaysSince(updated_at) })}
      </Typography>
      <Typography>{text}</Typography>
    </div>
  );
};

export default ActionValidationLogComment;
