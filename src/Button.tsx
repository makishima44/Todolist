type ButtonPropsType = {
  title: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
};

export const Button = ({
  title,
  isDisabled,
  onClickHandler,
}: ButtonPropsType) => {
  return (
    <button disabled={isDisabled} onClick={onClickHandler}>
      {title}
    </button>
  );
};
