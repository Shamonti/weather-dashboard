import { FaCloud } from 'react-icons/fa';

export default function Logo() {
  return (
    <div className='flex flex-row items-center justify-center flex-initial w-2/5 cursor-pointer bg-slate-100 rounded py-2'>
      <FaCloud size={16} className='me-2' />

      <h1>weather</h1>
    </div>
  );
}
