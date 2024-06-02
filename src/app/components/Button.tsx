interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  classname?: string;
}

export default function Button(props: ButtonProps) {
  const { children, classname, ...rest } = props;
  return (
    <button
      className={`w-[150px] lg:w-[250px] font-semibold py-1 lg:py-2 px-5 text-primary rounded-full text-lg lg:text-xl bg-white border-2 border-primary ${classname}`}
      {...rest}
    >
      {children}
    </button>
  );
}
