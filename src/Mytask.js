import React, {useState, useEffect} from 'react';
import {Box, Typography,  Button, FormControl, InputLabel, Input , Table, TableHead, TableRow, TableCell, TableBody, TableContainer} from '@mui/material';
import { makeStyles } from '@mui/styles'




const styleSched = makeStyles (()=>({
    body: {
        padding:'5%'
    },
    table: {
        padding: '2%',
        width:'80%',
        margin: 'auto',
        fontWeight:'600',
    },
    insidebox: {
        backgroundColor: 'lightcyan',
        margin:'auto',
        border:'2px solid black',
        borderRadius: '15px',
        width:'80vw'
    }
}))


let storeInfo = localStorage.getItem('dailytask' ) ? JSON.parse(localStorage.getItem('dailytask')) : [];
const Mytask = () => {

    const styles = styleSched();
    const [taskDay, setTaskDay] =useState('');
    const [dateSelect, setdateSelect] =useState('');
    const [infoEntry, setInfoEntry] =useState(storeInfo);
    const [id, setID] = useState(Date.now);
    

    const handletaskDay = (e) => {
        setTaskDay(e.target.value); 
    };

    const handledateSelect = (e) => {
        setdateSelect(e.target.value);
    };

    const handleDeleteAll = () => {
        if (window.confirm("Do you really want to delete all?")) {
            setInfoEntry([]);
        }
        else {
              return false;
        }
    };
    
    const handleDeleteEach = (e) => {

    if (window.confirm("Do you really want to delete this entry?")) {
        const numId = parseInt(e.target.value);
        const eachDelete = [...infoEntry].filter((item) => {
            return item.id !== numId;
            })
        setInfoEntry(eachDelete);
    }
    else {
            return false;
    }

    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        setID(Date.now);
        
        if (taskDay!=='' && dateSelect!=='' ) {
            const entryInput = {id, taskDay, dateSelect};
            alert ("You Have Save Your Log For the day")
            setInfoEntry([...infoEntry, entryInput]);      
        }
        else {
            alert('Please Put an Entry');
        }
        
        setTaskDay('');
        setdateSelect('');     
    } 
    useEffect(()=>{
        localStorage.setItem('dailytask', JSON.stringify(infoEntry));},[infoEntry]);
    
    return (
        
        <div className={styles.insidebox}>
            <form onSubmit={handleProductSubmit} >
                <Box className={styles.body} variant='contained' sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr', xs: '1fr' } }}>
                
                    <div>
                        <FormControl sx={{ margin: '3%' }}>
                            <InputLabel htmlFor="inputTask" >TASK TO DO</InputLabel>
                            <Input type="text"  id="inputTask" name="inputTask"  value={taskDay} onChange={handletaskDay}  multiline required />
                        </FormControl>
                    </div>

                    <div>
                        <FormControl sx={{ margin: '3%' }}>
                            <InputLabel htmlFor="dateTask" ></InputLabel>
                            <Input  id="dateTask" name="dateTask" type="date"  value={dateSelect} onChange={handledateSelect} required />
                        </FormControl>
                    </div>
                    <Button type='submit'>Save</Button>
                </Box>
                <Box className={styles.table} variant='contained'>
                    <Typography variant='h5'>My Task of the Day</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tasks Done</TableCell>
                                    <TableCell>Task of the Day</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell><Button onClick={handleDeleteAll}>Delete All</Button></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                {infoEntry.map((content)=> (
                                    <TableRow key={content.id}>
                                        <TableCell ><input type='checkbox'></input></TableCell>
                                        <TableCell >{content.taskDay}</TableCell>
                                        <TableCell>{content.dateSelect}</TableCell>
                                        <TableCell ><Button value={content.id}  onClick={handleDeleteEach}>Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </form>
        </div>
    )
}

export default Mytask
