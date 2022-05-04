import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link } from 'react-router-dom';

function HorseList() {
    const [loading, setLoading] = useState(true)
    const [horses, setHorses] = useState({horses: []});

    useEffect(() => {
        const fetchHorses = async() => {
            setLoading(true);
            try {
                await fetch('/horses')
                    .then(response => response.json()).then(data => setHorses(data));
            } catch(err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchHorses();
    }, []);

    const remove = async(e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`/horses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedHorses = horses.filter(i => i.id !== id);
                setHorses(updatedHorses);
            });
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <h3>Horses</h3>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/horses/new">Add Horse</Button>
                </div>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="30%">Color</th>
                        <th width="40%">Actions</th>
                    </tr>
                    </thead>
                    {!loading && (
                    <tbody>
                    {horses.map((horse) => (
                        <tr key={horse.id}>
                            <td style={{whiteSpace: 'nowrap'}}>{horse.name}</td>
                            <td>{horse.color}</td>
                            <td>
                            <ButtonGroup>
                                <Link 
                                    to={`/horses/${horse.id}`}
                                    state={{horseId: horse.id}}
                                    className='btn btn-primary'>
                                        Edit
                                </Link>
                                <Button size="sm" color="danger" onClick={(e) => remove(e, horse.id)}>Delete</Button>
                            </ButtonGroup>
                            </td>
                        </tr>))}
                    </tbody>
                    )}
                </Table>
            </Container>
        </div>
    );
}
export default HorseList;