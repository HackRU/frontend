import React from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { maxWidth } from '@material-ui/system';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FFF5e8",
    color: "#ad4444",
    fontSize: 20,
    fontWeight: 900,
    height: 80
  },
  body: {
    fontSize: 18,
    color: "#FFF5e8",
    border: "none"
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#bf4d4d",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#ad4444",
    },
  },
}))(TableRow);

function createData(offer, bronze, silver, gold, platinum, title) {
  return { offer, bronze, silver, gold, platinum, title };
}

function check(){ return <i className="fa fa-check-square-o fa-2x" style={{color: "#ffd562"}}></i>;}
function empty(){ return <i className="fa"></i>;}

const rows = [
    createData('Package Price', '$1,500', '$4,000', '$7,000', '$15,000', '$25,000 min'),
    createData('API/Demo', '2 min', '3 min', '5 min', '5 min', '7 min'),
    createData('Affiliated Mentors On-Site', check(), check(), check(), check(), check()),
    createData('Logo on Website', check(), check(), check(), check(), check()),
    createData('Sponsor Branded Prize', check(), check(), check(), check(), check()),
    createData('Distribute Swag', check(), check(), check(), check(), check()),
    createData('Distribute Recruiting Material', check(), check(), check(), check(), check()),
    createData('Reserved Table Space', empty(), check(), check(), check(), check()),
    createData('Tech Talk', empty(), check(), check(), check(), check()),
    createData('Recruiters On-Site', empty(), check(), check(), check(), check()),
    createData('Logo on T-Shirt', empty(), check(), check(), check(), check()),
    createData('Distribute Materials in Swag Bags', empty(), check(), check(), check(), check()),
    createData('Hacker Resumes and GitHubs', empty(), empty(), check(), check(), check()),
    createData('Host a Mini-Event', empty(), empty(), check(), check(), check()),
    createData('Mention in All Pre-Event Emails', empty(), empty(), check(), check(), check()),
    createData('Distribute Material at Registration', empty(), empty(), empty(), check(), check()),
    createData('Sponsor Lounge', empty(), empty(), empty(), check(), check()),
    createData('HackRU Co-presented by You', empty(), empty(), empty(), empty(), check()),
    createData('Reserved Keynote', empty(), empty(), empty(), empty(), check()),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    boxShadow: "2px 10px 30px 0.2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
  },
  table: {
    minWidth: maxWidth,
  },
}));

export default function SponsorshipPackages() {
  const classes = useStyles();

  return (
    <div className="content"> 
        <div className="col-12">
            <h1 className="display-4 theme-font" id="#packages">Sponsorship Packages</h1><hr />
        </div>
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <StyledTableCell>WHAT YOU GET</StyledTableCell>
                <StyledTableCell width="150dp" align="center">BRONZE</StyledTableCell>
                <StyledTableCell width="150dp" align="center">SILVER</StyledTableCell>
                <StyledTableCell width="150dp" align="center">GOLD</StyledTableCell>
                <StyledTableCell width="150dp" align="center">PLATINUM</StyledTableCell>
                <StyledTableCell width="150dp" align="center">TITLE</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => (
                <StyledTableRow key={row.offer}>
                <StyledTableCell component="th" scope="row">{row.offer}</StyledTableCell>
                <StyledTableCell align="center">{row.bronze}</StyledTableCell>
                <StyledTableCell align="center">{row.silver}</StyledTableCell>
                <StyledTableCell align="center">{row.gold}</StyledTableCell>
                <StyledTableCell align="center">{row.platinum}</StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
    </div>
  );
}
