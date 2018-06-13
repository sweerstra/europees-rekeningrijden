import React, { Component } from 'react';
import './OwnersSelect.css';
import Api from "../../api";
import { debounce } from "../../utils/debounce";

class OwnersSelect extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '', owners: [], selectedId: null };
  }

  componentDidMount() {
    this.ownerSearchCallBack = debounce(e => {
      const { value } = e.target;
      Api.owner.searchByName(value)
        .then(owners => this.setState({ owners }))
        .catch(() => this.setState({ selectedId: null }));
    }, 600);
  }

  render() {
    const { owners, selectedId } = this.state;

    return (
      <div className="owners-select">
        <input type="text"
               onChange={this.onOwnerSearchChange}
               placeholder="Search Person..."/>
        <ul>
          {
            owners.length > 0
              ? owners.map((owner, index) =>
                <li onClick={() => this.onSelect(owner)}
                    className={owner.id === selectedId ? 'active' : ''} key={index}>
                  {`${owner.firstName} ${owner.lastName}`}<br/>
                  {owner.citizenServiceNumber}
                </li>
              )
              : <div className="owners-select__no-owners">No owners available</div>
          }
        </ul>
      </div>
    );
  }

  onOwnerSearchChange = (e) => {
    e.persist();
    this.ownerSearchCallBack(e);
  };

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
