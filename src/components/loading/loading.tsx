import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const LoadingDots = () => {
  return (
    <div className=" mt-10 flex w-full justify-center">
      <div className="flex flex-row gap-2 items-center">
        <AiOutlineLoading3Quarters className="animate-spin w-5 h-5 text-blue-500" />
        <span className="font-medium text-blue-500 text-lg">Loading...</span>
      </div>
    </div>
  )
}
