import React, { Component } from 'react';
import './region.css';
import { AddIcon, RemoveIcon } from '../../images';

class Region extends Component {
  render() {
    return (
      <div className="region-page">
        <div className="region__map">
          Hier komt een map
        </div>
        <div className="region__info__table">
          Hier komt een tabel
        </div>
        <div className="region__info__prices">
          <div className="region__time__price--default">
            <span>Default Time</span>
            <input type="text" name="startTime" placeholder="00:00"/>
            <input type="text" name="endTime" placeholder="00:00"/>
            <input type="text" name="rate" placeholder="5.00"/>
          </div>
          <div className="region__time__price__headers">
            <span>Start Time</span>
            <span>End Time</span>
            <span>Rate</span>
          </div>
          <div className="region__time__price">
            <input type="text" name="startTime" placeholder="00:00"/>
            <input type="text" name="endTime" placeholder="00:00"/>
            <input type="text" name="rate" placeholder="5.00"/>
            <AddIcon/>
            <RemoveIcon/>
          </div>
          <div className="region__time__price">
            <input type="text" name="startTime" placeholder="00:00"/>
            <input type="text" name="endTime" placeholder="00:00"/>
            <input type="text" name="rate" placeholder="5.00"/>
            <AddIcon/>
            <RemoveIcon/>
          </div>
        </div>
        <button className="save-time-region-button btn">Save</button>
      </div>
    );
  }
}

export default Region;
