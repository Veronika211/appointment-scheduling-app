import * as React from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  text: string;
  active: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({href}): JSX.Element => <Link href={href} />;
