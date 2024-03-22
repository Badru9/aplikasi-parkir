interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button
      className="w-[250px] font-semibold py-2 px-5 rounded-full text-xl bg-white border-2 border-primary"
      {...rest}
    >
      {children}
    </button>
  );
}
