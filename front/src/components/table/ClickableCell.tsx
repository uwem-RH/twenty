import * as React from 'react';
import { Link } from 'react-router-dom';

type OwnProps = {
  href: string;
  children?: React.ReactNode;
};

function ClickableCell({ href, children }: OwnProps) {
  return <Link to={href}>{children}</Link>;
}

export default ClickableCell;