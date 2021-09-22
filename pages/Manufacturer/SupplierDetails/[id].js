import React, { useState, map } from "react";
import PageHeader from "../../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { Paper, makeStyles, Container, Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ManuOrderDetailsForm from "./ManufacturerOrder.Details.js.js";
import Image from "next/image";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Controls from "../../../components/controls/Controls";
import TestHeader from "../../../components/Headers/TestHeader";
import Manu_SideMenu from "../../../components/sideMenu/Manu_SideMenu";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Popup from '../../../components/Popup';
import Notification from "../../../components/Notification"
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
      minWidth:75,
      padding: theme.spacing(2),
      margin: theme.spacing(3)
   
  },
  media: {
    // height: 140,
  
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  orderButton:{
    left: '60px'
  }
}));

export default function SupplierDetails() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [recordForEdit,setRecordForEdit]=useState([]);
  const [openPopup,setOpenPopup]=useState(false);
 
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/user/getsuppliersItems/${id}`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setRecordForEdit(response.data)
      });
  }, []);
  const addOrEdit = async (user, resetForm) => {

  
      setOpenPopup(false);
      //updateuser(user.quantitys,req_id)
      setNotify({
        isOpen: true,
        message: `Request Sent at ${user}`,
        type: "success",
      });
      setRecordForEdit(null);
      resetForm;
    };
  return (
    <div>
      <Manu_SideMenu/>
      <TestHeader/>
      
      <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
      <PageHeader
        title="New Product"
        subTitle="Adding products for Access"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      {/* <Paper elevation={0} style={{ margin: "2px", padding: "2px" }}> */}
        <Container className={classes.root} >
          <Grid className="sample-grid" container >
            {users.map((item) => (
              <Grid item xs={4}>
      
                <Card className={classes.root}>
                <CardActionArea>
                <Image
                      src={`/../public/upload/${item.image}`}
                      className={classes.media}
                      // src="/avatar.PNG"
                      priority="true"
                      // layout='fill'
                      width={1000}
                      height={700}
                      alt="Picture of the author"
                    />
                    <br />
                  <CardContent key={item.user_id}>
                    <Typography variant="h5" component="h2">
                      {item.upc}
                    </Typography>
                    <hr/>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      <b>Created At &emsp; </b>{item.ItemCreatedAt}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <b>Location &emsp; </b>Longitude - {item.Longitude} and Latitude -{" "}
                      {item.latitude}
                    </Typography>
                    <Typography className={classes.pos} color="textPrimary">
                     <b>Items Quantity &emsp; </b> {item.quantity} PCs
                      <br />
                    </Typography>
                    
                 

                  </CardContent>
               
                 <CardContent>
                  <Controls.MainButton
                  className={classes.orderButton}
                
                   text="Order"
                //    className={classes.newButton}
                   variant="outlined"
                   startIcon={<ShoppingCartIcon/>}
                   onClick={()=>{setOpenPopup(true);setRecordForEdit(item);}}
                />
                </CardContent>
                  </CardActionArea>
                  </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      {/* </Paper> */}
      <Paper>
      {console.log(recordForEdit)}
      <Notification notify={notify} setNotify={setNotify} />
      <Popup
              title="Order Details Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              addOrEdit={addOrEdit}
            >
              <ManuOrderDetailsForm {...recordForEdit} addOrEdit={addOrEdit}/>
            </Popup>
      
      </Paper></div>
    </div>
  );
}

{/* <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card> */}
