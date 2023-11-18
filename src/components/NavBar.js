import Logo from './Logo';

export default function NavBar({ children }) {
  return (
    <nav className='flex flex-row items-center'>
      <Logo />
      {children}
    </nav>
  );
}
