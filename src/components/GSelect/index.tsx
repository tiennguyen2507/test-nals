import { FC } from 'react'

export interface TSelectOptions {
  label: string;
  value: string;
};


type TSelect = {
  value?: TSelectOptions['value'],
  data: TSelectOptions[],
  onChange?: Function,
};


const GSelect: FC<TSelect> = ({ data, value = undefined, onChange = () => { } }) => {
  return (
    <div className="dropdown" >
      <li
        className="btn dropdown-toggle w-full border" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {value ? data.find((item) => item.value === value)?.label : 'Select'}
      </li>

      <div
        className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {data.map((item, index) => {
          return (<p className="dropdown-item" key={index} onClick={() => onChange(item.value)}>{item.label}</p>)
        })}
      </div>
    </div>
  )
}


export default GSelect