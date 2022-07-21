import React from "react";


type InputWithLableProps = {
    initVal: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    //telling compiler type property is optional by giving question mark
    type?: string;
    isFocused?: boolean;
    children: React.ReactNode;
}

const InputWithLable  = ({
    initVal, 
    onInputChange, 
    label, 
    type='text', 
    children,
    isFocused,
  }:InputWithLableProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
  
    React.useEffect(()=>{
      if(isFocused && inputRef.current){
        inputRef.current.focus();
      }
    },[isFocused]); 
  
    return(
    <>
      <label htmlFor={label} className="label">{children}</label>
      <input id={label}
        ref={inputRef}
        type={type}
        onChange={onInputChange} 
        value={initVal}
        className="input"
        />
    </> 
    );
  };

  export{InputWithLable};