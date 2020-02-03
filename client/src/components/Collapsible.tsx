import React, {useState} from "react";

interface Props {
  label?: string;
  defaultCollapsed?: boolean
}

const Collapsible: React.FC<Props> = ({
    label, defaultCollapsed, children
}) => {

    let [collapsed, toggleCollapsed] = useState(defaultCollapsed ? defaultCollapsed : true)
  return (
<div className='border border-primary cursor-pointer'>
      <div
        className='flex flex-row items-center justify-between w-full border-b border-primary p-2' onClick={_event => toggleCollapsed(collapsed === true ? false : true)}>
        <div>
          {label}
        </div>
        <div>
          {
            collapsed === true ?
              <svg width="16" height="16" viewBox="0 0 32 32" fill="#ffcb1f">
                <path
                  d="M32 16c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zM3 16c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13-13-5.82-13-13z"
                />
                <path
                  d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z"
                />
              </svg> :
              null
          }
          {
            collapsed === false ?
              <svg width="16" height="16" viewBox="0 0 32 32" fill="#ffcb1f">
                <path
                  d="M0 16c0 8.837 7.163 16 16 16s16-7.163 16-16-7.163-16-16-16-16 7.163-16 16zM29 16c0 7.18-5.82 13-13 13s-13-5.82-13-13 5.82-13 13-13 13 5.82 13 13z"
                />
                <path
                  d="M22.086 20.914l2.829-2.829-8.914-8.914-8.914 8.914 2.828 2.828 6.086-6.086z"
                />
              </svg> :
              null
          }
        </div>
      </div>
      {
        collapsed === false ?
<div className="p-2"> {children} </div> :
          null
}
    </div>
  );
};

export default Collapsible;