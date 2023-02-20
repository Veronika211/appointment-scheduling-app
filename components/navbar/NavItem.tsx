import { Tab, Tabs, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { Button } from "../ui/Button";

interface navItemProps {
  href: string;
  text: string;
  active: boolean;
}

const NavItem: React.FC<navItemProps> = ({
  href,
  text,
  active,
}): JSX.Element => {
  return <Link href={href}></Link>;
};

export default NavItem;
