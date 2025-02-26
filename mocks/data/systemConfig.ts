const mockedSystemConfig = () => [
  {
    id: 1,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "PER_PAGE",
    value: "25",
    description: "Default total items to display for pagination",
  },
  {
    id: 2,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "MAX_FILESIZE",
    value: "10",
    description: "Default maximum file size for uploads",
  },
  {
    id: 3,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "SUPPORTED_FILETYPES",
    value: "pdf,doc,docx,png,jpeg,jpg,tsv,csv",
    description: "Pre-defined list of accepted file types accepted for uploads",
  },
  {
    id: 4,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "VALIDATION_SCHEMA",
    value:
      '\n                    {\n                        "validationSchema": {\n                            "password": {\n                                "type": "string",\n                                "minLength": 8,\n                                "maxLength": 32,\n                                "pattern": "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$"\n                            },\n                            "email": {\n                                "type": "string",\n                                "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"\n                            }\n                        }\n                    }\n                ',
    description: "Default validation for frontend form elements",
  },
  {
    id: 5,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "IDVT_ORG_VERIFY_PERCENT",
    value: "88",
    description:
      "Default percentage required for passing Organisation verification",
  },
  {
    id: 6,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    name: "IDVT_ORG_SIC_WEIGHT_DECREASE",
    value: "0.05",
    description:
      "Default weighting decrement value for Organisations within undesirable SIC codes",
  },
];

const mockedFormattedSystemConfig = () => ({
  PER_PAGE: {
    id: 1,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description: "Default total items to display for pagination",
    value: "25",
  },
  MAX_FILESIZE: {
    id: 2,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description: "Default maximum file size for uploads",
    value: "10",
  },
  SUPPORTED_FILETYPES: {
    id: 3,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description: "Pre-defined list of accepted file types accepted for uploads",
    value: "pdf,doc,docx,png,jpeg,jpg,tsv,csv",
  },
  VALIDATION_SCHEMA: {
    id: 4,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description: "Default validation for frontend form elements",
    value: {
      password: {
        type: "string",
        minLength: 8,
        maxLength: 32,
        pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$",
      },
      email: {
        type: "string",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
      },
    },
  },
  IDVT_ORG_VERIFY_PERCENT: {
    id: 5,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description:
      "Default percentage required for passing Organisation verification",
    value: "88",
  },
  IDVT_ORG_SIC_WEIGHT_DECREASE: {
    id: 6,
    created_at: "2024-07-17T12:37:55.000000Z",
    updated_at: "2024-07-17T12:37:55.000000Z",
    description:
      "Default weighting decrement value for Organisations within undesirable SIC codes",
    value: "0.05",
  },
});

const mockedValidationSchema = () => ({
  password: {
    type: "string",
    minLength: 8,
    maxLength: 32,
    pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$",
  },
  email: {
    type: "string",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
  },
});

export {
  mockedSystemConfig,
  mockedValidationSchema,
  mockedFormattedSystemConfig,
};
