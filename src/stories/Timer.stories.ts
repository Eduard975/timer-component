import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Timer } from "../components/timer";
const meta = {
  title: "Example/Timer",
  component: Timer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "title from props",
    endTime: 25,
  },
};

export const Finished: Story = {
  args: {
    title: "title from props",
    endTime: 25,
    elapsedTime: 25,
  },
};

export const EndTimeTooBigError: Story = {
  args: {
    title: "title from props",
    endTime: 3600,
  },
};

export const InvalidElapsedTimeError: Story = {
  args: {
    title: "title from props",
    endTime: 60,
    elapsedTime: 61,
  },
};
