import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table, ButtonGroup } from 'reactstrap';
import AppNavbar from './AppNavbar.js';

function RaceEdit() {
    const [item, setItem] = useState({
        place: '',
        time: '',
        horses: [],
        betId: 0,
        winner: 0
    });
    const [title, setTitle] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [horses, setHorses] = useState([]);
    const [checked] = useState(false);

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
                if (item.horses.includes(id)) {
                    delete item.horses[item.horses.indexOf(id)];
                }
                if (item.betId === id) {
                    item.betId = 0;
                }
                setHorses(updatedHorses);
            });
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
        handleChange(e);
    }

    const participating = (e, id) => {
        if (!item.horses.includes(id)) {
            item.horses.push(id);
        }
        else{
            delete item.horses[item.horses.indexOf(id)];
        }
        handleChange(e);
    }

    useEffect(() => {
        const today = new Date();
        const fetchData = async() => {
            setLoading(true)
            const race = await (await fetch(`/races/${state.raceId}`)).json();
            setTitle(<h2>Edit Race</h2>)
            console.log(race.time)
            if (race.time + ":00" < today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() && !race.horses.includes(race.winner)) {
                console.log(Math.random() * race.horses.length);
                race.winner = race.horses[parseInt(Math.random() * race.horses.length)];
                console.log(race.winner);
                fetch('/races' + (race.id ? '/' + race.id : ''), {
                    method: (race.id) ? 'PUT' : 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(race),
                }).then((response) => {console.log(response)});
            }
            setItem(race);
            setLoading(false);
        }
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
        if (item.place === '' && state !== null && state.raceId !== 'new' && loading){
            fetchData();
            fetchHorses();
        }
        if (horses.length === 0 && loading) {
            fetchHorses();
        }
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({...item, [e.target.name]: value});
    };

    const saveRace = (e) => {
        e.preventDefault();
        console.log(item);
        fetch('/races' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        }).then((response) => {console.log(response)}).then(navigate('/races'));
    };

    return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form>
                    <FormGroup>
                        <Label for="place">Place</Label>
                        <Input type="text" name="place" id="place" value={item.place} placeholder='e.g. Narva'
                                onChange={(e) => handleChange(e)} autoComplete="place"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input type="text" name="time" id="time" value={item.time} placeholder='e.g. 13:00'
                               onChange={(e) => handleChange(e)} autoComplete="time"/>
                    </FormGroup>
                    <div>
                        <Container fluid>
                            <h3>Horses</h3>
                            <div className="float-right">
                                <Button color="success" tag={Link} to="/horses/new">Add Horse</Button>
                            </div>
                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th width="10%">Bet</th>
                                    <th width="20%">Name</th>
                                    <th width="20%">Color</th>
                                    <th width="40%">Actions</th>
                                </tr>
                                </thead>
                                {!loading && (
                                <tbody>
                                {horses.map((horse) => (
                                    <tr key={horse.id} style={{background: item.horses.includes(horse.id) ? 'lightgreen' : ''}}>
                                        <td>
                                            <input className='form-check-input' name='betId' type='radio' id='betId' value={horse.id} onChange={(e) => handleChange(e)} disabled={item.horses.includes(horse.id) && item.horses.length > 1 && !item.horses.includes(item.winner) ? false : true} defaultChecked={item.betId === horse.id ? true : checked}></input>
                                        </td>
                                        <td style={{whiteSpace: 'nowrap'}}>{item.winner === horse.id ? horse.name + " (Winner)" : horse.name}</td>
                                        <td>{horse.color}</td>
                                        <td>
                                        <ButtonGroup>
                                            <Button size="sm" color="success" onClick={(e) => participating(e, horse.id)}>Participating</Button>
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
                    <FormGroup>
                        {!item.horses.includes(item.winner) && (
                        <Button color="primary" type="submit" onClick={saveRace}>Save</Button>)}{' '}
                        <Button color="secondary" tag={Link} to="/races">{item.horses.includes(item.winner) ? 'Back' : 'Cancel'}</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
}
export default RaceEdit;