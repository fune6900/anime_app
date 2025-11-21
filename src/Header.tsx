type Props = {
  children: React.ReactNode;
};

function Header(props: Props) {
  const { children } = props;
  return (
    <div>
      <header>
        <h1>ANIMEFLEX</h1>
        <main>{children}</main>
      </header>
    </div>
  )
}

export default Header
