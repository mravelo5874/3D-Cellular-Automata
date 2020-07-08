import React from 'react';
import { Help } from './Help';

export function RenderAdjustableValue(adjustable, key, name, valueChanged) {
  let type = adjustable.type;
  switch (type) {
    case 'slider':
      return SliderView(adjustable, key, name, valueChanged);
    case 'toggle':
      return ToggleView(adjustable, key, name, valueChanged);
    case 'dropdown':
      return DropdownView(adjustable, key, name, valueChanged);
    default:
      return;
  }
}

function SliderView(slider, key, name, valueChanged) {
  let step = (slider.max-slider.min)/100.0;
  return (
    <div className='form-inline' key={key}>
      <div className="row w-100">
        <div className="col-sm">{name}: {slider.value.toFixed(2)}</div>
        {slider.help && <div className="col-sm-1 text-right"><Help text={slider.help}></Help></div>}
      </div>
      <input 
        className='form-control-range' type='range' 
        min={slider.min} max={slider.max} value={slider.value} step={step}
        onChange={ev => valueChanged(Number(ev.target.value))}></input> 
    </div>
 );
}

function ToggleView(toggle, key, name, valueChanged) {
  return (
    <div className="row w-100">
      <div className="col-sm">
        <div className='form-check' key={key}>
          <input 
            type='checkbox' className='form-check-input'
            checked={toggle.value}
            onChange={ev => valueChanged(ev.target.checked)}></input>
          <label className='form-check-label'>{name}</label>
        </div>
      </div>
      {toggle.help && <div className="col-sm-1 text-right"><Help text={toggle.help}></Help></div>}
    </div>
  );
}

function DropdownView(dropdown, key, name, valueChanged) {
  let onChange = ev => valueChanged(Number(ev.target.value));
  return (
    <div className="row w-100">
      <div className="col-sm">
        <div className='form-inline' key={key}>
          <label className='mr-2'>{name} </label>
          <select className='custom-select custom-select-sm' value={dropdown.value} onChange={onChange}>
            {dropdown.options.map((option, i) => (
              <option value={i} key={`${name}_${key}_${i}`}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      {dropdown.help && <div className="col-sm-1 text-right"><Help text={dropdown.help}></Help></div>}
    </div>
  );
}