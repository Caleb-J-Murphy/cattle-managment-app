import { IconFingerprint, IconGauge, IconHome2, IconPig, IconPlus } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Navbar.module.css';

const navItems = [
  { icon: IconHome2, label: 'Home', path: '/' },
  { icon: IconGauge, label: 'Dashboard', path: '/dashboard' },
  { icon: IconPlus, label: 'Add Animal', path: '/createAnimal' },
  { icon: IconPig, label: 'View Animals', path: '/animalList' },
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
            const active = location.pathname === path;
            return (
              <Tooltip key={label} label={label} position="right" transitionProps={{ duration: 0 }}>
                <UnstyledButton
                  component={Link}
                  to={path}
                  className={classes.link}
                  data-active={active || undefined}
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
