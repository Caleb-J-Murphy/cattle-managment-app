import classes from './Welcome.module.css';
import { Text } from '@mantine/core';

export function WelcomeText() {
    return (
        <Text className={classes.normal} ta="center" size="lg">The only livestock app you will need</Text>
    )
}