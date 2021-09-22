import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector,useDispatch } from "react-redux";
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import KitchenOutlinedIcon from '@material-ui/icons/KitchenOutlined';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    // backgroundColor: theme.palette.secondary.main,
  },
  timeline:{
    // height:'500px'
  }
}));

export default function CustomizedManuTimeline() {
  const scannerLogger=useSelector((state)=>state.Logger)
  console.log(scannerLogger)
    const dispatch = useDispatch()
  const classes = useStyles();

  return (
    
    <Timeline align="alternate" className={classes.timeline}>
      {console.log(scannerLogger.SLogger[2])}
      <TimelineItem>
        {/* <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
          Manufacturer Address: 
          </Typography>
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineDot>
          <BusinessOutlinedIcon/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
               Manufacturer Address
            </Typography>
            <Typography>{scannerLogger.SLogger[2]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        {/* <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            10:00 am
          </Typography>
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineDot color="primary">
            <StoreMallDirectoryOutlinedIcon/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Supplier Name
            </Typography>
            <Typography>{scannerLogger.SLogger[4]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <PermIdentityOutlinedIcon/>
          </TimelineDot>
          <TimelineConnector  />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Supplier latitude and longitude
            </Typography>
            <Typography>{scannerLogger.SLogger[5]} and {scannerLogger.SLogger[6]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <SupervisorAccountOutlinedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Raw Material code
            </Typography>
            <Typography>{scannerLogger.SLogger[1]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        {/* <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
          Manufacturer Address: 
          </Typography>
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineDot>
          <KitchenOutlinedIcon/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
           Price
            </Typography>
            <Typography>{scannerLogger.SLogger[7]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        {/* <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            10:00 am
          </Typography>
        </TimelineOppositeContent> */}
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LocalOfferOutlinedIcon/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
           Time
            </Typography>
            <Typography>{scannerLogger.SLogger[8]}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      
    </Timeline>
  );
}

// ProduceBySupplier,         // 0
//             ForSaleBySupplier,         // 1
//             PurchasedByManufacturer,  // 2
//             ShippedBySupplier,         // 3
//             ReceivedByManufacturer,   // 4
//             ProcessedByManufacturer,  // 5
//             PackagedByManufacturer,    // 6
//             ForSaleByManufacturer,    // 7
//             PurchasedByBrand,         // 8
//             ShippedByManufacturer,    // 9
//             ReceivedByBrand// 10



//Raw Material code:upc
//Supplier Name: origin Supplier Name
//Manufacturere Address: owner ID
//price
//supplier longitude latitude
//date (if converted)