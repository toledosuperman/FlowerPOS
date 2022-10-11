import React, { Component } from 'react';
 
import Header from './header';
import Footer from './footer';

    
class home extends Component {
    
        //const { user, logout } = UserAuth();
        //const navigate = useNavigate();
      
        //const handleLogout = async () => {
          //try {
            //await logout();
            //navigate('/');
            //console.log('You are logged out')
          //} catch (e) {
            //console.log(e.message);
          //}
        //};

    render() {
        return (
            
    <div className="wrapper">
		<Header />
		{/*body of the page */}
		<Footer />
    </div>
)
    }
} export default home;