import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DescriptionIcon from '@material-ui/icons/Description';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      marginTop: 80,
    },
    itemList: {
      listStyleType: "none",
    },
    item: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 15,
    },
    itemIcon: {
      fontSize: 20,
      paddingRight: 10,
      verticalAlign: "middle",
    },
    linkItem: {
      color: "#000000",
      textDecoration: "none",
      '&:hover': {
        background: "#A9A9A9",
      },
    },
    avatar: {
    },
    userItem: {
      marginLeft: 20,
    },
  }),
);

interface ToolBarProps {

}

export const ToolBar: React.FC<ToolBarProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);

  return (
    <Card className={classes.toolbar}>
      <CardContent>
        <ul className={classes.itemList}>
          <li className={classes.item}><Link to="/user/top" className={classes.linkItem}><span className={classes.itemIcon}><HomeIcon/></span>ホーム</Link></li>
          <li className={classes.item}><span className={classes.itemIcon}><DirectionsRunIcon/></span>エクササイズ</li>
          <li className={classes.item}><span className={classes.itemIcon}><DescriptionIcon/></span>履歴</li>
          <li className={classes.item}><span className={classes.itemIcon}><EqualizerIcon/></span>体重管理</li>
          <li className={classes.item}><span className={classes.itemIcon}><GroupIcon/></span>交流場</li>
          <li className={classes.item}><span className={classes.itemIcon}><NotificationsIcon/></span>通知</li>
          <li className={classes.item}><Link to={`/user/${userData['id']}`} className={classes.linkItem}><span className={classes.itemIcon}><PersonIcon/></span>プロフィール</Link></li>
        </ul>
      </CardContent>
      <CardHeader
        className={classes.userItem}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PersonIcon/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userData ? userData.name : ""}
        subheader={userData ? userData['email'] : ""}
      />
    </Card>
  );
}