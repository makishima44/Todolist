type TodoListHeaderPropsType = {
  title: string;
};

export const TodoListHeader = ({ title }: TodoListHeaderPropsType) => {
  return <h3>{title}</h3>;
};
