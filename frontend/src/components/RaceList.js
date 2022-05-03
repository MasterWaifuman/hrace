import React, { Component, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar.js';
import { Link, useNavigate } from 'react-router-dom';

function RaceList() {
    const [loading, setLoading] = useState(true)
    const [races, setRaces] = useState({races: []});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRaces = async() => {
            setLoading(true);
            try {
                await fetch('/races')
                    .then(response => response.json()).then(data => setRaces(data));
            } catch(err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchRaces();
    }, []);

    const remove = async(e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`/races/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedRaces = races.filter(i => i.id !== id);
                setRaces(updatedRaces);
            });
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    const today = new Date();

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/races/new" style={{margin: 10}}>Add Race</Button>
                </div>
                <h3>Races</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Place</th>
                        <th width="20%">Time</th>
                        <th width="20%">Status</th>
                        <th width="40%">Actions</th>
                    </tr>
                    </thead>
                    {!loading && (
                    <tbody>
                    {races.map((race) => (
                        <tr key={race.id}>
                            <td style={{whiteSpace: 'nowrap'}}>{race.place}</td>
                            <td>{race.time}</td>
                            <td>{race.time + ":00" < today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() ? 'Over' : 'Not started'}</td>
                            <td>
                            <ButtonGroup>
                                <Link 
                                    to={`/races/${race.id}`}
                                    state={{raceId: race.id}}
                                    className='btn btn-primary'>Details</Link>
                                <Button size="sm" color="danger" onClick={(e) => remove(e, race.id)}>Delete</Button>
                            </ButtonGroup>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    )}
                </Table>
            </Container>
        </div>
    );
}
export default RaceList;