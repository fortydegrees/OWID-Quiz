import React from "react";

interface Props {
  label: string;
  className?: string;
  disabled?: boolean;
  userAnswer?: string;
  correctAnswer?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  label,
  className,
  disabled = false,
  userAnswer,
  correctAnswer,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}

      className={`flex-grow min-w-full lg:min-w-0 lg:w-5/12 text-center border-primary justify-center bg-transparent font-semibold py-2 px-4 border-2 my-4 mx-auto lg:mx-4 ${((label === correctAnswer) && !!userAnswer) && "bg-green-500 cursor-default"} ${disabled && (label !== correctAnswer) && "opacity-50 cursor-not-allowed"}  ${disabled && (correctAnswer !== label) && (label === userAnswer) && "opacity-50 bg-red-400 cursor-not-allowed"} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
