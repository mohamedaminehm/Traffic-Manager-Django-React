import React, { Component , useState } from 'react';
import axios from 'axios';
/*import {
    Row,Card, CardImg,Col, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
  } from 'reactstrap';*/

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';




export class List extends Component {
    constructor(){
        super();
        this.state = {
            'data' : [],
        };
    };

    

    componentDidMount(){
        axios.get("/api_post/posts/")
            .then(res => {
                
                
                this.setState({
                    'data' : res.data,
                });
                
            })
    };
    

    render() {
        return (
           <ul>
               {this.state.data.slice(0).reverse().map(function(item,index){
                   return <ContentPost item={item} key={index} />
               })}
           </ul>
        )
    }
};
export default List;



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginBottom : 20
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));


const ContentPost = ( { item, key } ) =>  {

    

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    function duration (last_update){
        const days = new Date().getDay() - new Date(last_update).getDay();
        const hours = new Date().getHours()  - new Date(last_update).getHours();
        const minutes = new Date().getMinutes() - new Date(last_update).getMinutes();
        console.log(new Date().getHours());
        console.log(new Date(last_update).getHours());
        console.log(new Date().getMinutes());
        console.log(new Date(last_update).getMinutes());
        if (days){return ( <p>Il y a {days} day </p> ) ;
        }else if (hours){return (<p>Il y a {hours} hours</p>);
        }else if (minutes){return( <p>Il y a {minutes} minutes</p> )
        }else { return(<p>Now</p>) }
        

    };
    
    


        return(

            <Card className={classes.root} xs="12">
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <BusinessCenterIcon/>
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={item.title}
                    subheader= { duration(item.last_update) }
                />
                <CardMedia
                    className={classes.media}
                    image={item.image}
                    title="card"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ThumbDownIcon />
                    </IconButton>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph>Options qu'on peut l'ajoutés:</Typography>
                    
                    <Typography paragraph>
                        une suite d'article : pas encore <br/>
                        un sondage : pas de sondage pour le moment <br/>
                        un graph   : pas de graph pour le moment  <br/>
                         
                    </Typography>
                    </CardContent>
                </Collapse>
    </Card>
           
        );
    
    
};












/* 
 <Card>
                            <CardBody>
                                <CardTitle><h2>{this.props.item.title}</h2></CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                            </CardBody>
                            <img width="100%" src={this.props.item.image} alt="Card image cap" />
                            <CardBody>
                                <CardText>{this.props.item.content}</CardText>
                                <CardLink href="#">Card Link</CardLink>
                                <CardLink href="#">Another Link</CardLink>
                            </CardBody>
                        </Card>
                    
*/

