import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar.js';

function HorseEdit() {
    const [item, setItem] = useState({
        name: '',
        color: '',
    });
    const [title, setTitle] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
                const horse = await (await fetch(`/horses/${state.horseId}`)).json();
                setItem(horse);
                setTitle(<h2>Edit Horse</h2>)
        }
        if (item.name === '' && state !== null && state.raceId !== 'new' ){
            fetchData();
        }
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({...item, [e.target.name]: value});
    };

    const saveHorse = (e) => {
        e.preventDefault();
        console.log(item);
        fetch('/horses' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => {console.log(response)}).then(navigate(-1));
    };

    return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name}
                                onChange={(e) => handleChange(e)} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="color">Color</Label>
                        <Input type="text" name="color" id="color" value={item.color}
                               onChange={(e) => handleChange(e)} autoComplete="color"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={saveHorse}>Save</Button>{' '}
                        <Button color="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
}
export default HorseEdit;