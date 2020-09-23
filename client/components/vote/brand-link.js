/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { __ } from 'lib/i18n';

const BrandLink = ( { showBranding } ) => {
	return (
		<div className="crowdsignal-forms-vote__branding">
			{ showBranding && (
				<a
					className="crowdsignal-forms-vote__branding-link with-external-icon"
					href="https://crowdsignal.com"
					target="blank"
					rel="noopener noreferrer"
				>
					{ __( 'Powered by Crowdsignal' ) }
				</a>
			) }
			{ ! showBranding && (
				<span className="crowdsignal-forms-vote__branding-link">
					&nbsp;
				</span>
			) }
		</div>
	);
};

export default BrandLink;