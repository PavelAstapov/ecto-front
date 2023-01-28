import Footer from './Footer'
import HeaderMenu from './HeaderMenu'

export default function Layout({ children }: any) {
  return (
    <>
      <HeaderMenu/>
        <main>{children}</main>
      <Footer />
    </>
  )
}