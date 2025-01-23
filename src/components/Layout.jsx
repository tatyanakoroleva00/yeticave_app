import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children, user, setUser}) => {
  return (
    <div className="page-wrapper">
        <Header user={user} setUser={setUser}/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout