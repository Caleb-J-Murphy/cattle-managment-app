import { IconFingerprint, IconGauge, IconHome2, IconPig, IconPlus } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { routes } from '../../routing/constants';
import classes from './Navbar.module.css';

const navItems = [
  { icon: IconHome2, label: 'Home', path: routes.home },
  { icon: IconGauge, label: 'Dashboard', path: routes.dashboard },
  { icon: IconPlus, label: 'Add Animal', path: routes.createAnimal },
  { icon: IconPig, label: 'View Animals', path: routes.animalList },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className={classes.navbar}>
      <Center>
        <IconFingerprint />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === `${path}` ? true : undefined;

            return (
              <Tooltip key={label} label={label} position="right" transitionProps={{ duration: 0 }}>
                <UnstyledButton
                  component={Link}
                  data-active={active}
                  className={classes.link}
                  to={path}
                >
                  <Icon size={20} stroke={1.5} />
                </UnstyledButton>
              </Tooltip>
            );
          })}
        </Stack>
      </div>
    </nav>
  );
}
