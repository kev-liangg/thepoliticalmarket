import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Paper } from "@material-ui/core";
import Texas_Flag from "./State_flag.jpg";
import Cali_Flag from "./Cali_Flag.png";
import Mary_Flag from "./Mary_Flag.png";
const useStyles = makeStyles((theme) => ({
    grid: {
    width : '100%',
    margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light
    }
}));
function States(){
    const classes = useStyles();
    return (
        <Grid container spacing ={2} className = {classes.grid}>
            <Grid item md={3}>
                <Paper className = {classes.paper}>Texas</Paper>
                <img className="rounded mx-auto d-block" src={Texas_Flag} alt="" width="300" height="200"></img>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>California</Paper>
                <img className="rounded mx-auto d-block" src={Cali_Flag} alt="" width="300" height="200"></img>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>Maryland</Paper>
                <img className="rounded mx-auto d-block" src={Mary_Flag} alt="" width="300" height="200"></img>
            </Grid>
        </Grid>
    )
}
export default States