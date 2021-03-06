// @flow
import * as React from 'react';
import { toggleArtifact } from '../reducer';
import { NATIVE_WIN, NATIVE_LINUX, NATIVE_MAC } from '../constants';
import { Checkbox } from '~/components/Checkbox';
import { Connect } from '~/store/Connect';
import cc from 'classcat';

import IconWindows from 'react-icons/fa/windows';
import IconLinux from 'react-icons/fa/linux';
import IconMacos from 'react-icons/fa/apple';

const getPlatformIcons = platforms => {
  return (
    <p>
      <em>Supported platforms: &nbsp;</em>
      {platforms.map(platform => {
        switch (platform) {
          case NATIVE_WIN:
            return <IconWindows key="fa-win" />;
          case NATIVE_MAC:
            return <IconMacos key="fa-mac" />;
          case NATIVE_LINUX:
            return <IconLinux key="fa-linux" />;
          default:
            return null;
        }
      })}
    </p>
  );
};

import type { BuildConfig, BindingDefinition } from '../types';

type Props = {|
  id: string,
|};

export const BuildArtifact = ({ id }: Props) => (
  <Connect
    state={({ build }: { build: BuildConfig }) => {
      const artifact = build.artifacts.byId[id];

      return {
        artifact,
        checked: build.availability[artifact.id] !== undefined && build.contents[artifact.id],
        showDescriptions: build.descriptions,
        disabled: build.availability[artifact.id] === undefined || artifact.required === true,
      };
    }}
    actions={{
      toggleArtifact,
    }}
  >
    {({ artifact, checked, disabled, showDescriptions }, { toggleArtifact }) => {
      if (showDescriptions) {
        return (
          <div className={cc(['artifact', { 'text-muted': disabled }])}>
            <Checkbox
              value={artifact.id}
              label={artifact.title}
              disabled={disabled}
              checked={checked && !disabled}
              onChange={toggleArtifact}
            />
            {artifact.natives && getPlatformIcons(artifact.natives)}
            <p dangerouslySetInnerHTML={{ __html: artifact.description }} />
            {artifact.website && (
              <p>
                <a href={artifact.website} target="_blank" rel="noopener">
                  {artifact.website}
                </a>
              </p>
            )}
          </div>
        );
      } else {
        return (
          <Checkbox
            value={artifact.id}
            label={artifact.title}
            disabled={disabled}
            checked={checked}
            onChange={toggleArtifact}
          />
        );
      }
    }}
  </Connect>
);
