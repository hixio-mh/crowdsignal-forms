/**
 * External dependencies
 */
import classNames from 'classnames';
import { includes, kebabCase, mapKeys, some } from 'lodash';

/**
 * Internal dependencies
 */
import { FontFamilyType, FontFamilyMap, PollStatus } from './constants';

/**
 * Creates a new Answer object then returns a copy of the passed in `answers` array with the new answer appended to it.
 *
 * @param  {Array}  answers The existing array of answers.
 * @param  {string} text	The text for the new answer to add.
 * @return {Array}			The newly created answers array.
 */
export const addAnswer = ( answers, text ) => [
	...answers,
	{
		answerId: null,
		text,
	},
];

export const getFontFamilyFromType = ( type ) => {
	if ( ! includes( FontFamilyType, type ) ) {
		return null;
	}

	return FontFamilyMap[ type ];
};

export const getStyleVars = ( attributes, fallbackColors ) =>
	mapKeys(
		{
			borderColor: attributes.borderColor ?? fallbackColors.accent,
			borderRadius: `${ attributes.borderRadius }px`,
			borderWidth: `${ attributes.borderWidth }px`,
			bgColor: attributes.backgroundColor,
			fontFamily: getFontFamilyFromType( attributes.fontFamily ),
			submitButtonBgColor:
				attributes.submitButtonBackgroundColor || fallbackColors.accent,
			submitButtonTextColor:
				attributes.submitButtonTextColor || fallbackColors.textInverted,
			textColor: attributes.textColor || fallbackColors.text,
			contentWideWidth: fallbackColors.contentWideWidth,
		},
		( _, key ) => `--crowdsignal-forms-${ kebabCase( key ) }`
	);

/**
 * Returns a css 'class' string of overridden styles given a collection of attributes.
 *
 * @param {*} attributes The block's attributes
 * @param {...any} extraClasses A list of additional classes to add to the class string
 */
export const getBlockCssClasses = ( attributes, ...extraClasses ) => {
	return classNames(
		{
			'has-font-family':
				attributes.fontFamily &&
				FontFamilyType.THEME_DEFAULT !== attributes.fontFamily,
			'has-bg-color': attributes.backgroundColor,
			'has-text-color': attributes.textColor,
			'has-submit-button-bg-color':
				attributes.submitButtonBackgroundColor,
			'has-submit-button-text-color': attributes.submitButtonTextColor,
			'has-border-radius': attributes.borderRadius ?? false,
			'has-box-shadow': attributes.hasBoxShadow,
		},
		extraClasses
	);
};

/**
 * Determines if the poll is closed based on its editor settings.
 *
 * @param {string} pollStatus The poll's status, as set in the editor.
 * @param {string} closedAfterDateTimeUTC The UTC date time string to close the poll after if pollStatus is PollStatus.CLOSED_AFTER.
 * @param {Date}   currentDateTime  Optionally set the current date that will be used for current time comparisons.
 */
export const isPollClosed = (
	pollStatus,
	closedAfterDateTimeUTC,
	currentDateTime = new Date()
) => {
	if ( PollStatus.CLOSED === pollStatus ) {
		return true;
	}

	if ( PollStatus.CLOSED_AFTER === pollStatus ) {
		const closedAfterDateTime = new Date( closedAfterDateTimeUTC );

		return closedAfterDateTime < currentDateTime;
	}

	return false;
};

/**
 * Parses the published post content to find the given pollId to determine if it is a published or unpublished poll.
 *
 * @param {*} pollId Id of the poll to search for.
 * @param {*} postContent Content of the published post.
 */
export const pollIdExistsInPageContent = ( pollId, postContent ) => {
	if ( ! pollId ) {
		return false;
	}

	const pollBlockInstanceStrings = postContent.split( '<!-- ' );
	// remove the 1st one since it will either be a blank string, or it will be other post content that is NOT a poll
	pollBlockInstanceStrings.splice( 0, 1 );

	return some( pollBlockInstanceStrings, ( blockInstanceString ) => {
		if (
			0 !== blockInstanceString.indexOf( 'wp:crowdsignal-forms/poll' )
		) {
			return false;
		}

		const start = 'wp:crowdsignal-forms/poll'.length;
		const pollJsonString = blockInstanceString.substr(
			start,
			blockInstanceString.lastIndexOf( '/-->' ) - start
		);
		const poll = JSON.parse( pollJsonString );
		return poll.pollId && poll.pollId === pollId;
	} );
};
