import type { Meta, StoryObj } from "@storybook/nextjs";

import { mockedProject } from "@/mocks/data/project";
import FieldsToText from "./FieldsToText";

const meta = {
  title: "components/FieldsToText",
  component: FieldsToText,
  tags: ["autodocs"],
} satisfies Meta<typeof FieldsToText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: mockedProject({
      lay_summary:
        "This study aims to evaluate how digital mental health interventions (such as mobile apps for meditation, cognitive behavioral therapy, and mental health tracking) affect the mental health and well-being of young adults aged 18-30. By analyzing data from a large sample of users who have consented to share their anonymized usage information and mental health outcomes, we hope to understand which types of interventions are most effective and identify patterns in user engagement. This information will be essential for designing better digital health tools that support young adult mental health.",
      technical_summary:
        "This project involves analyzing anonymized, aggregated data from digital health applications used by young adults. The dataset includes app usage metrics, such as frequency and duration of sessions, type of intervention (e.g., mindfulness meditation, journaling), and self-reported mental health outcomes gathered through in-app surveys. The research team will use statistical modeling and machine learning techniques to identify patterns and correlations between app usage and mental health improvements. The analysis will follow strict ethical guidelines, ensuring data security and user privacy, with all personal identifiers removed prior to analysis. The results will be statistically summarized, and individual data points will not be reported.",
    }),
    keys: ["lay_summary", "technical_summary"],
    tKey: "Projects",
  },
};
