import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
 
class Footer extends Component {
    render() {
        return (
            <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; FlowerPOS 2022</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
)
    }
}
export default Footer;