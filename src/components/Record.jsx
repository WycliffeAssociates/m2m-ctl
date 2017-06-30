import React from 'react';
import styled from 'styled-components';

const StyledRecord = styled.div`
	flex: 1 1 5rem;
	padding: 0.25rem;
	cursor: pointer;
	background-color: ${({ associated }) => associated ? 'steelblue' : 'initial'};
	color: ${({ associated }) => associated ? 'white' : 'initial'};
	font-weight: ${({ associated }) => associated ? 'bold' : 'normal'};
	pointer-events: ${({ status }) => status === 'busy' ? 'none' : 'auto'};
`;

const Record = props => {
	let { content, logicalName, entityId, status, associated, associate, disassociate } = props;
	return (
		<StyledRecord
			className='record'
			status={status}
			associated={associated}
			logicalName={logicalName}
			entityId={entityId}
			onClick={() => {
				if (status !== 'busy') {
					return associated ? disassociate(entityId) : associate(entityId);
				}
			}}
		>
			{content}
		</StyledRecord>
	);
};

export default Record;
