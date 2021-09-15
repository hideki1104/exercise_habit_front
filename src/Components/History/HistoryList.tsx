import React, { useState, useEffect } from 'react';
import { connectGet } from '../Api/ConnectApi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    history_img: {
      width: 50,
      height: 50,
    }
  }),
);

interface HistoryListProps {
}

export const HistoryList: React.FC<HistoryListProps> = () => {
  const classes = useStyles();

  const convertJst = (date:string) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }

  type HistoryData = {
    id: number
    name: string
    set_count: number
    url: string
    thumbnail_id: string
    created_at: string
  }

  const [historiesList, setHistoriesList] = useState<HistoryData[]>([]);

  useEffect(() => {
    const connectGetHistoryList = async () => {
      const responseData = await connectGet(`http://localhost:3000/histories`);
      if (!responseData.isSuccess) {
        return;
      }
      setHistoriesList(responseData.data);
    }

    connectGetHistoryList();
  }, [])

  return (
    <>
      <List className={classes.root}>
        {historiesList.map((history) => (
          <ListItem>
            <ListItemAvatar>
              <img className={classes.history_img} id="img" alt="" src={`https://i.ytimg.com/vi/${history ? history.url : ""}/${history ? history.thumbnail_id : ""}`}></img>
            </ListItemAvatar>
            <ListItemText primary={`${history ? history.name : ""} × ${history ? history.set_count : ""}セット`} secondary={`${history ? convertJst(history.created_at) : ""}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}