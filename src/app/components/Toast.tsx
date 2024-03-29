import { motion } from "framer-motion";
import { BiX, BiCheckCircle, BiXCircle } from "react-icons/bi";

interface ToastProps {
  text: string;
  onClose: () => void;
  state?: boolean;
  onShow?: boolean;
}

export default function Toast({ onClose, text, state, onShow }: ToastProps) {
  return (
    onShow && (
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        className="w-fit fixed top-10 right-10 bg-white py-5 pl-5 pr-14 font-medium text-xl rounded-lg shadow-md"
      >
        <div className="flex gap-3">
          {state ? <BiCheckCircle size={24} /> : <BiXCircle size={24} />}
          <p>{text}</p>
        </div>
        <BiX
          onClick={onClose}
          size={24}
          className="absolute right-2 top-2 cursor-pointer"
        />
      </motion.div>
    )
  );
}
