import type { StoryObj } from "@storybook/react";

import SyntaxHighlighter from "react-syntax-highlighter";

const Forms = () => {
  const codeString = `
    interface FormFieldValues {
      name: string;
    }

    const TestComponent = ({ queryState, onSubmit }) => {
      const tForm = useTranslations('Form');

      const defaultValues = {
        name: ''
      };

      const schema = useMemo(
        () =>
          yup.object().shape({
            name: yup.string().required(tForm("nameRequiredInvalid")),
          }),
        []
      );

      const handleSubmit = ({ name }: FormFieldValues) => {
        onSubmit({ name });
      }

      return (
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          autoComplete="off"
          disabled={queryState.isLoading}
        >
          {({ formState: { errors } }) => (
            <FormSection>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="name"
                    error={errors.name}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
              </Grid>
              </FormSection>
              <FormActions>
                <LoadingButton
                  type="submit"
                  disabled={queryState.isLoading}
                  endIcon={<SaveIcon />}
                  loading={queryState.isLoading}>
                  {tProfile("submitButton")}
                </LoadingButton>
              </FormActions>
            </>
          )}
        </Form>
      );
    }
  `;

  return (
    <SyntaxHighlighter language="typescript">{codeString}</SyntaxHighlighter>
  );
};

const meta = {
  title: "recipes/Forms",
  component: Forms,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
