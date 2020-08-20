/*
 * Note: Any changes made to the attributes definition need to be duplicated in
 *       Crowdsignal_Forms\Frontend\Blocks\Crowdsignal_Forms_Vote_Item_Block::attributes()
 *       inside includes/frontend/blocks/class-crowdsignal-forms-vote-item-block.php.
 */
export default {
	voteItemId: {
		type: 'string',
		default: null,
	},
	type: {
		type: 'string',
	},
};