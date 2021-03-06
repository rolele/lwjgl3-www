// @flow
import * as React from 'react';
import { LazyImg } from '~/components/LazyImg';

type BadgeProps = {
  title: string,
  href: string,
  src: string,
};

export const BuildBadge = ({ title, href, src }: BadgeProps) => (
  <tr>
    <th>{title}</th>
    <td>
      <a href={href} target="_blank" rel="noopener">
        <LazyImg width={90} height={20} src={src} alt={`${title} build status`} />
      </a>
    </td>
  </tr>
);
