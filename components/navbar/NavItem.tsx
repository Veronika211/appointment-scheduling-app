import * as React from 'react';
import Link from 'next/link';

interface navItemProps {
  href: string;
  text: string;
  active: boolean;
}

const NavItem: React.FC<navItemProps> = ({href}): JSX.Element => {
  return <Link href={href}></Link>;
};

export default NavItem;
