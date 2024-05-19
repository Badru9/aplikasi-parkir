interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  classname?: string;
}

export default function Button(props: ButtonProps) {
  const { children, classname, ...rest } = props;
  return (
    <button
      className={`w-[250px] font-semibold py-2 px-5 text-primary rounded-full text-xl bg-white border-2 border-primary ${classname}`}
      {...rest}
    >
      {children}
    </button>
  );
}
