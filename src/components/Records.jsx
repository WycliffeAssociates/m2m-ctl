import React from 'react';
import styled from 'styled-components';

import Record from './Record';
import PhantomRecord from './PhantomRecord';

import { fillArray } from '../modules/Utils';
import { FILTER_ALL, FILTER_SELECTED, FILTER_UNSELECTED } from '../modules/Constant';

const StyledRecords = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	height: ${({isCollapsed}) => isCollapsed ? '0px' : '100%'};
	overflow: hidden;
`;

const shouldShow = (currentFilter, isAssociated) => (
	(currentFilter === FILTER_ALL) ||
	(currentFilter === FILTER_SELECTED && isAssociated) ||
	(currentFilter === FILTER_UNSELECTED && !isAssociated)
);

const renderRecords = props => {
	const { currentFilter, config, isReady, list, associatedIds, associate, disassociate } = props;

	return list && list.map((item, index) => {
		const id = item[config.relatedEntPrimaryIdAttr];
		// TODO: Find a more efficient way to do this
		const isAssociated = associatedIds.indexOf(id) !== -1;

		return (
			shouldShow(currentFilter, isAssociated)
				? <Record
					key={index}
					content={item[config.displayField]}
					isReady={isReady}
					isAssociated={isAssociated}
					onClick={isReady ? () => (isAssociated ? disassociate(id) : associate(id)) : null}
				/>
				: null
		);
	});
};

const renderPhantomRecords = list => {
	// Assuming that this record container spans the full width of the body.
	const rowWidth = window.document.body.clientWidth;
	const recordFlexBasis = 90;
	const itemsWidth = list.length * recordFlexBasis;

	if (itemsWidth > rowWidth) {
		// 12 phantom elements should be able to keep things in column-like appearance for a number of
		// different scenarios.
		return fillArray(<PhantomRecord />, 12);
	}
};

const Records = props => {
	return (
		<StyledRecords className="records" isCollapsed={props.isCollapsed}>
			{renderRecords(props)}
			{renderPhantomRecords(props.list)}
		</StyledRecords>
	);
};

export default Records;
