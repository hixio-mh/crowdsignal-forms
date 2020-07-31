/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { getBackgroundColor } from 'components/with-fallback-styles/util';

export const getPollStyles = ( node ) => {
	if ( null === node ) {
		return {};
	}

	const buttonNode = node.querySelector( '.wp-block-button__link' );
	const textNode = node.querySelector( 'p' );
	const h3Node = node.querySelector( 'h3' );
	const wideContentNode = node.querySelector( '.alignwide' );

	return {
		accent: getBackgroundColor( buttonNode ),
		surface: getBackgroundColor( textNode ),
		text: window.getComputedStyle( textNode ).color,
		bodyFontFamily: window.getComputedStyle( textNode ).fontFamily,
		questionFontFamily: window.getComputedStyle( h3Node ).fontFamily,
		textInverted: window.getComputedStyle( buttonNode ).color,
		contentWideWidth: window.getComputedStyle( wideContentNode ).maxWidth,
	};
};

export const PollStyles = () => (
	<>
		<p />
		<h3>Question</h3>
		<div className="wp-block-button">
			<div className="wp-block-button__link" />
		</div>
		<div className="entry-content">
			<div className="alignwide" />
		</div>
	</>
);
