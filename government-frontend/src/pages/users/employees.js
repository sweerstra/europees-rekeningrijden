import React, { Component } from 'react';
import './employees.css';
import Api from '../../api';
import ReactTable from 'react-table';
import Navigation from '../../components/Navigation/Navigation';

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: null,
      employees: [],
      employee: {},
      isEditing: false
    };
    this.state.employee.role = "admin";
  }

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees = () => {
    Api.employee.getAll()
      .then(employees => this.setState({ employees }));
  };

  onEmployeeEditChange = ({ target }) => {
    let { name, value, checked, type } = target;

    if (type === 'checkbox') {
      value = checked;
    }

    this.setState(state => ({
      employee: {
        ...state.employee,
        [name]: value
      }
    }));
  };

  loadEmployeeForm = (employee) => {
    this.setState({ employee });
  };

  editEmployee = () => {
    Api.employee.edit(this.state.employee).then(() => {
      this.loadEmployees();
    });
  };

  createEmployee = () => {
    const {employee} = this.state;
    delete employee.id;
    Api.employee.add(employee).then(() => {
      this.loadEmployees();
    });
  };

  render() {
    const columns = [
      {
        Header: 'User ID',
        accessor: 'id',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Active',
        id: 'active',
        accessor: d => d.active ? <span>&#x2713;</span> : undefined
      }
    ];

    const { employee, selectedRow, isEditing } = this.state;

    return (
      <div className="employees">
        <Navigation heading="Traxit Trackers"
                    onLogout={this.props.onLogout}/>
        <div className="employees__table">
          <ReactTable
            data={this.state.employees}
            columns={columns}
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && rowInfo.original.id === selectedRow;

              return {
                onClick: () => {
                  const { id } = rowInfo.original;

                  this.loadEmployeeForm(rowInfo.original);

                  this.setState({ selectedRow: id, isEditing: true });
                },
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
            minRows="0"
            showPagination={false}
          />
        </div>
        <div className="employees__administration">
          <button className="btn blue" onClick={() => this.setState({ isEditing: false })}>Add employee</button>
          <div>
            <h2>{`${isEditing ? 'Edit' : 'Create'} Employee`}</h2>
            <section>
              <label>
                Email address
                <input type="email"
                       value={employee.email}
                       onChange={this.onEmployeeEditChange}
                       required
                       name="email" placeholder="Email"/>
              </label>
            </section>

            {!isEditing && <section>
              <label>
                Password
                <input type="password"
                       value={employee.password}
                       onChange={this.onEmployeeEditChange}
                       required
                       name="password" placeholder="Password"/>
              </label>
            </section>}

            <section>
              <label>
                Role
                <select name="role" onChange={this.onEmployeeEditChange} value={employee.role}>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </label>
            </section>

            <section>
              <label>
                Active
                <input type="checkbox"
                       checked={employee.active}
                       onChange={this.onEmployeeEditChange}
                       required
                       name="active"/>
              </label>
            </section>

            <div className="employees__administration__button">
              {isEditing
                ? <button className="btn blue" onClick={this.editEmployee}>Edit</button>
                : <button className="btn blue" onClick={this.createEmployee}>Create</button>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;
