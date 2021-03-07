import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Paper } from "@material-ui/core";
import Lockheed from "./Lockheed.jpg";
import Boeing from "./Boeing.png";
import Raytheon from "./Raytheon.png";
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
function Contractors(){
    const classes = useStyles();
    return (
        <Grid container spacing ={2} className = {classes.grid}>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Name/NAICS/State</Paper>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Lockheed Martin/336414/Maryland</Paper>
                <img className="rounded mx-auto d-block" src={Lockheed} alt="" width="300" height="200"></img>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Boeing/336414/Illinois</Paper>
                <img className="rounded mx-auto d-block" src={Boeing} alt="" width="300" height="200"></img>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Raytheon/334511/Massachusetts</Paper>
                <img className="rounded mx-auto d-block" src={Raytheon} alt="" width="300" height="200"></img>
            </Grid>
        </Grid>
    );
}
export default Contractors