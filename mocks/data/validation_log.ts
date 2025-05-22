import { ValidationLog, Comment } from "@/types/logs";
import { faker } from "@faker-js/faker";

const mockedValidationComment = (comment?: Partial<Comment>): Comment => ({
  id: faker.number.int(),
  validation_log_id: faker.number.int(),
  user_id: faker.number.int(),
  comment: faker.helpers.arrayElement([
    "all ok",
    "needs review",
    "approved",
    "please check",
    "looks good",
  ]),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.past().toISOString(),
  ...comment,
});

const mockedValidationLog = (log?: Partial<ValidationLog>): ValidationLog => {
  const id = log?.id || faker.number.int();

  const completedAt =
    Math.random() > 0.5 ? faker.date.recent().toISOString() : null;

  const comments = completedAt
    ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockedValidationComment({
          validation_log_id: id || faker.number.int(),
        })
      )
    : [];

  return {
    id,
    entity_type: "App\\Models\\Custodian",
    entity_id: faker.number.int(),
    secondary_entity_type: "App\\Models\\Project",
    secondary_entity_id: faker.number.int(),
    tertiary_entity_type: "App\\Models\\Registry",
    tertiary_entity_id: faker.number.int(),
    completed_at: completedAt,
    manually_confirmed: completedAt ? (Math.random() > 0.5 ? 1 : 0) : 0,
    comments,
    validation_check: {
      id: faker.number.int(),
      name: faker.string.alpha({ length: 10 }).toLowerCase().replace(/ /g, "_"),
      description: faker.lorem.sentence(),
      enabled: 1,
      applies_to: "Organisation",
      created_at: faker.date.recent().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    },
    ...log,
  };
};

export { mockedValidationLog, mockedValidationComment };
