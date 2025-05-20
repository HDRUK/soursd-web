interface ValidationCheck {
  id: number;
  name: string;
  description: string;
  applies_to: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}
interface PostValidationCheck {
  name: string;
  description: string;
  applies_to: string;
  enabled: boolean;
}

type PutValidationCheck = Partial<ValidationCheck>;

export type { ValidationCheck, PutValidationCheck, PostValidationCheck };
