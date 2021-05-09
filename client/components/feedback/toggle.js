/**
 * External dependencies
 */
import React, { forwardRef, useCallback, useEffect } from 'react';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import CloseIcon from 'components/icon/close-small';
import { FeedbackToggleMode } from 'blocks/feedback/constants';

const CloseButton = () => (
	<>
		<CloseIcon />
		{ __( 'Close', 'crowdsignal-forms' ) }
	</>
);

const FeedbackToggle = ( { attributes, className, isOpen, onClick }, ref ) => {
	useEffect( () => {
		if ( isOpen || attributes.toggleOn !== FeedbackToggleMode.PAGE_LOAD ) {
			return;
		}

		onClick();
	}, [] );

	const handleHover = useCallback( () => {
		if ( isOpen || attributes.toggleOn !== FeedbackToggleMode.HOVER ) {
			return;
		}

		onClick();
	}, [ attributes.toggleOn, isOpen ] );

	const classes = classnames(
		'crowdsignal-forms-feedback__trigger',
		'wp-block-button__link',
		className,
		{
			'is-active': isOpen,
		}
	);

	return (
		<div className="wp-block-button crowdsignal-forms-feedback__trigger-wrapper">
			<button
				ref={ ref }
				className={ classes }
				onClick={ onClick }
				onMouseEnter={ handleHover }
			>
				{ isOpen ? (
					<CloseButton />
				) : (
					<RichText.Content value={ attributes.triggerLabel } />
				) }
			</button>
		</div>
	);
};

export default forwardRef( FeedbackToggle );
