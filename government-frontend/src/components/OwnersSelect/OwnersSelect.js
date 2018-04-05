import React, { Component } from 'react';
import './OwnersSelect.css';

class OwnersSelect extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '', selectedId: null };
  }

  render() {
    const { selectedId } = this.state;
    const search = this.state.search.toLowerCase();
    const { owners } = this.props;
    const filteredOwners = owners.filter(owner => {
      return owner.firstName.toLowerCase().includes(search)
        || owner.lastName.toLowerCase().includes(search)
    });

    return (
      <div className="owners-select">
        <input type="text"
               onChange={this.onSearch}
               placeholder="Search Owner..."/>
        <ul>
          {
            owners.length > 0
              ? filteredOwners.map((owner, index) =>
                <li onClick={() => this.onSelect(owner)}
                    className={owner.id === selectedId ? 'active' : ''} key={index}>
                  {`${owner.firstName} ${owner.lastName}`}
                </li>
              )
              : <div className="owners-select__no-owners">No owners available</div>
          }
        </ul>
      </div>
    );
  }

  onSelect = (owner) => {
    this.setState({ selectedId: owner.id });
    this.props.onSelect(owner);
  };

  onSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }
}

export default OwnersSelect;
