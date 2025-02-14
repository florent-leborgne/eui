import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiAccordion,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  commonDurationRanges,
} from '../../../../src/components';

import PrettyDuration from './pretty_duration';
const prettyDurationSource = require('!!raw-loader!./pretty_duration');

export const PrettyDurationExample = {
  title: 'Pretty duration',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: prettyDurationSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use <EuiCode>prettyDuration</EuiCode> to convert a start and end
            date string to a human-friendly format.
          </p>

          <p>
            Start and end values for the duration are passed as the first and
            second arguments, respectively. These can be timestamps (
            <EuiCode>2018-01-17T18:57:57.149Z</EuiCode>) or relative times (
            <EuiCode>now-15m</EuiCode>).
          </p>

          <p>
            An array of quick range values is passed as the third argument.
            These are used to pretty format custom ranges. EUI exports
            <EuiCode>commonDurationRanges</EuiCode> which can be passed here.
          </p>

          <EuiAccordion
            id="commonDurationRanges"
            buttonContent="Show commonDurationRanges definition"
          >
            <EuiCodeBlock>
              {JSON.stringify(commonDurationRanges, null, 2)}
            </EuiCodeBlock>
          </EuiAccordion>

          <EuiSpacer />

          <p>
            The output date/time format is specified by the fourth argument.
          </p>
        </Fragment>
      ),
      demo: <PrettyDuration />,
    },
  ],
};
