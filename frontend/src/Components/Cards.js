import Aos from "aos";
import "aos/dist/aos.css";
import { harddata } from '../hardCodedData'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react'
import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
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

function Cards() {
  const [data, setData] = useState(harddata)
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  const fetchMoreData = () => {
    setTimeout(() => {
      setData(data.concat(harddata))
    }, 500)
  }




  const cardRender = (card, index) => {
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };



    return (
      <div data-aos="flip-left" style={{ margin: '10px' }}>
        <Card className={classes.root} className="home" >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
           </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={card.title}
            subheader={card.date}
          />
          <CardMedia
            className={classes.media}
            image={card.image}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.headline}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
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
              <Typography paragraph>Description:</Typography>
              <Typography paragraph >
                {card.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
  return (

    <div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}

      >
        {data.map(cardRender)}
      </InfiniteScroll>

    </div>

  )
}

export default Cards