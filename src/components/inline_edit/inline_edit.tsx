/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';
import classNames from 'classnames';
import { EuiButtonEmpty, EuiButton } from '../button';
import { EuiFieldText, EuiFormRow, EuiForm } from '../form';
import { EuiTitle, EuiTitleSize } from '../title';
import { EuiText, TextSize } from '../text';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
// import { useEuiTheme } from '../../services';
// import { euiInlineEditStyles } from './inline_edit.styles';
import { htmlIdGenerator } from '../../services/accessibility';

export const DISPLAY_TYPES = ['title', 'text'] as const;
export type EuiInlineEditDisplayType = typeof DISPLAY_TYPES[number];

interface TitleDisplayProps {
  display: 'title';
  size?: EuiTitleSize;
}

interface TextDisplayProps {
  display: 'text';
  size?: TextSize;
}

export type EuiInlineEditProps = CommonProps &
  ExclusiveUnion<TextDisplayProps, TitleDisplayProps> & {
    /**
     * Display type for the text in readView
     */
    display: EuiInlineEditDisplayType;
    /**
     * Default string value for input in readView
     */
    defaultValue?: string;
    /**
     * Allow users to pass in a function when the confirm button is clicked
     */
    onConfirm?: () => void;
    confirmButtonAriaLabel?: string;
    cancelButtonAriaLabel?: string;
    /**
     * Start in editView
     */
    startWithEditOpen?: boolean;
    /**
     * Form label that appears above the form control
     */
    inputLabel: String;
  };

export const EuiInlineEdit: FunctionComponent<EuiInlineEditProps> = ({
  children,
  className,
  display,
  // m is the default for both EuiTitle and EuiText
  size = 'm',
  defaultValue = 'Click me to edit',
  onConfirm,
  confirmButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen,
  inputLabel,
  ...rest
}) => {
  const classes = classNames('euiInlineEdit', className);

  // Styles to come later
  /*const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];*/

  const [isInEdit, setIsInEdit] = useState(startWithEditOpen);
  const inlineEditInputId = htmlIdGenerator('__inlineEditInput')();

  /* Text Controls */
  const [editViewValue, setEditViewValue] = useState(defaultValue || '');
  const [readViewValue, setReadViewValue] = useState(defaultValue);

  const editTextViewOnChange = (e: any) => {
    setEditViewValue(e.target.value);
  };

  const saveTextEditValue = () => {
    const input = (document.getElementById(
      inlineEditInputId
    ) as HTMLInputElement).value;

    // If there's no text, cancel the action, reset the input text, and return to readView
    if (input) {
      setReadViewValue(input);
      setIsInEdit(!isInEdit);
      onConfirm && onConfirm();
    } else {
      setEditViewValue(readViewValue);
      setIsInEdit(!isInEdit);
    }
  };

  const textEditViewElement = (
    <EuiForm fullWidth>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label={inputLabel}>
            <>
              <EuiFieldText
                id={inlineEditInputId}
                value={editViewValue}
                onChange={editTextViewOnChange}
                autoFocus
                {...(rest as any)}
              />
            </>
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton
              iconType="check"
              aria-label={confirmButtonAriaLabel || 'confirm'}
              onClick={saveTextEditValue}
              color="primary"
              fill
            >
              Save
            </EuiButton>
          </EuiFormRow>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton
              iconType="cross"
              aria-label={cancelButtonAriaLabel || 'cancel'}
              onClick={() => {
                setEditViewValue(readViewValue);
                setIsInEdit(!isInEdit);
              }}
              color="primary"
            >
              Cancel
            </EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  const textReadViewElement = (
    <EuiButtonEmpty
      color="text"
      iconType="pencil"
      iconSide="right"
      autoFocus
      onClick={() => {
        setIsInEdit(!isInEdit);
      }}
    >
      {display === 'title' ? (
        <EuiTitle size={size as EuiTitleSize}>
          <h2>{readViewValue}</h2>
        </EuiTitle>
      ) : (
        <EuiText size={size as TextSize}>{readViewValue}</EuiText>
      )}
    </EuiButtonEmpty>
  );

  /* Current Form Control in View */
  const currentFormControlInView = isInEdit
    ? textEditViewElement
    : textReadViewElement;

  return (
    <div className={classes} {...rest}>
      {currentFormControlInView}
    </div>
  );
};
