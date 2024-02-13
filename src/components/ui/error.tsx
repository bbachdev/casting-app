import { MdErrorOutline } from "react-icons/md";

interface ErrorProps {
  message: string;
}

export default function Error(props: ErrorProps) {
  return (
    <p className={`bg-destructive/90 text-white px-4 py-2 rounded-sm flex flex-row`}>
      <MdErrorOutline className={`text-2xl`} />
      <span className={`ml-2`}>{props.message}</span>
    </p>
  )
}