import React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash.isequal';

import GroupHeader from './GroupHeader';
import Records from './Records';

const StyledGroup = styled.div`
	margin-top: 0.75rem;

	&:first-of-type {
		margin-top: 0;
	}
`;

class Group extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			allSelected: this.setAllSelected(),
		};
		this.setCollapsed = this.setCollapsed.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.setAllSelected = this.setAllSelected.bind(this);
	}

	setCollapsed(isCollapsed, cb) {
		this.setState({ collapsed: !this.state.collapsed }, cb);
	}

	setAllSelected(props = this.props, cb) {
		let idsNotAssociated = props.item.list
			.map(entry => entry[props.config.relatedEntPrimaryIdAttr])
			.filter(id => props.associated.indexOf(id) === -1);
		this.setState({ allSelected: idsNotAssociated.length === 0 }, cb);
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props.associated, nextProps.associated)) {
			this.setAllSelected(nextProps);
		}
	}

	selectAll() {
		this.props.item.list
			.map(entry => entry[this.props.config.relatedEntPrimaryIdAttr])
			.filter(id => this.props.associated.indexOf(id) === -1)
			.forEach(id => {
				this.props.associate(id, this.setAllSelected);
			});
	}

	deselectAll() {
		this.props.item.list
			.map(entry => entry[this.props.config.relatedEntPrimaryIdAttr])
			.filter(id => this.props.associated.indexOf(id) !== -1)
			.forEach(id => {
				this.props.disassociate(id, this.setAllSelected);
			});
	}

	render() {
		let { ready, filter, config, item, associated, associate, disassociate } = this.props;
		
		return (
			<StyledGroup className="group">
				<GroupHeader
					ready={ready}
					title={item.name}
					collapsed={this.state.collapsed}
					setCollapsed={this.setCollapsed}
					allSelected={this.state.allSelected}
					selectAll={this.selectAll}
					deselectAll={this.deselectAll}
				/>
				<Records
					filter={filter}
					ready={ready}
					config={config}
					list={item.list}
					collapsed={this.state.collapsed}
					associated={associated}
					associate={associate}
					disassociate={disassociate}
				/>
			</StyledGroup>
		);
	}

}

export default Group;
