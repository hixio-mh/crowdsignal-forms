/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import {
	Button,
	Dropdown,
	ToolbarButton,
	ToolbarGroup,
	Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PlacementIcon from 'components/icon/placement';
import { views } from './constants';

const blockPositions = [
	{ x: 'left', y: 'top' },
	{ x: 'right', y: 'top' },
	{ x: 'left', y: 'bottom' },
	{ x: 'right', y: 'bottom' },
];

const FeedbackToolbar = ( {
	attributes,
	currentView,
	onViewChange,
	setAttributes,
} ) => {
	const handleViewChange = ( view ) => () => onViewChange( view );

	const handleSetPosition = ( x, y ) => setAttributes( { x, y } );

	return (
		<BlockControls>
			<ToolbarGroup label={ __( 'Current view', 'crowdsignal-forms' ) }>
				<ToolbarButton
					className="crowdsignal-forms-feedback__toolbar-toggle"
					isActive={ currentView === views.QUESTION }
					label={ __( 'Question', 'crowdsignal-forms' ) }
					onClick={ handleViewChange( views.QUESTION ) }
				>
					{ __( 'Question', 'crowdsignal-forms' ) }
				</ToolbarButton>
				<ToolbarButton
					className="crowdsignal-forms-feedback__toolbar-toggle"
					isActive={ currentView === views.SUBMIT }
					label={ __( 'Submit', 'crowdsignal-forms' ) }
					onClick={ handleViewChange( views.SUBMIT ) }
				>
					{ __( 'Submit', 'crowdsignal-forms' ) }
				</ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<div className="crowdsignal-forms-feedback__toolbar-position-toggle-wrapper">
					<Dropdown
						popoverProps={ {
							className:
								'crowdsignal-forms-feedback__toolbar-popover-wrapper',
						} }
						renderToggle={ ( { onToggle } ) => (
							<Tooltip
								text={ __(
									'Change button position',
									'crowdsignal-forms'
								) }
							>
								<ToolbarButton
									className={ `crowdsignal-forms-feedback__toolbar-position-toggle ${ attributes.y }-${ attributes.x }` }
									onClick={ onToggle }
									icon={ PlacementIcon }
								/>
							</Tooltip>
						) }
						renderContent={ ( { onClose } ) => (
							<div className="crowdsignal-forms-feedback__toolbar-popover">
								{ map( blockPositions, ( { x, y } ) => {
									const buttonClasses = classnames(
										'crowdsignal-forms-feedback__position-button',
										{
											'is-active':
												attributes.x === x &&
												attributes.y === y,
										}
									);

									return (
										<Button
											className={ buttonClasses }
											onClick={ () => {
												handleSetPosition( x, y );
												onClose();
											} }
										/>
									);
								} ) }
							</div>
						) }
					/>
				</div>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default FeedbackToolbar;
