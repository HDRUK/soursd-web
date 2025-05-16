interface ValidationCheck {
  id: number;
  name: string;
  description: string;
  applies_to: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

type PutValidationCheck = Partial<ValidationCheck>;

export type { ValidationCheck, PutValidationCheck };
