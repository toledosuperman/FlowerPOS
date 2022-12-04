import React, { Component } from 'react';
import './footer.css';
 
class Footer extends Component {
    render() {
        return (
            <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; FlowerPOS 2022</div>
                    
                </div>
            </div>
        </footer>
)
    }
}
export default Footer;