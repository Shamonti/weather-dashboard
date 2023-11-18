export default function Box({ children }) {
  return (
    <div className='border border-slate-700 rounded py-4 px-6 mb-2'>
      {children}
    </div>
  );
}
