export type MyTimerProps = { title: string; endTime: number; elapsedTime?: number };

export const Timer = ({ title, endTime }: MyTimerProps) => (
    <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt={`${title} ${endTime}`}
    />
);