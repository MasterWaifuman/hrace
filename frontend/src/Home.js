import React from 'react';
import './App.js';
import AppNavbar from './components/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

function Home() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Link to='/races'><img src='https://i.pinimg.com/736x/2a/0c/80/2a0c8007e9df41b071cbbe7c47a6bb0e.jpg'></img></Link>
                </Container>
            </div>
        );
}
export default Home;