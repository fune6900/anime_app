import './App.css'

type Props = {
  children: React.ReactNode;
};

function Header(props: Props) {
  const { children } = props;
  return (
    <div>
      <header className='app-header'>
        <h1 className='app-title'>ANIFLEX</h1>
        <main>{children}</main>
      </header>
    </div>
  )
}

export default Header
