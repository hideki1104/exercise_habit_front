import React, { useState, useEffect } from 'react';
import { connectGet } from '../Api/ConnectApi';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    history_img: {
      width: 50,
      height: 50,
    },
    history_paging: {
      '& > *': {
        marginTop: theme.spacing(2),
      }
    },
    totalHistoriesTitle: {
      color: "#808080",
    },
    totalHistoriesNum: {
      fontSize: 24,
      fontWeight: "bold",
    },
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

  const [page, setPage] = useState(1);
  const [historiesList, setHistoriesList] = useState<HistoryData[]>([]);
  const [displayedItems, setDisplayedItems] = useState<HistoryData[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [totalHistoriesNum, setTotalHistoriesNum] = useState<number>(0);
  const displayNum = 5;

  useEffect(() => {
    const connectGetHistoryList = async () => {
      const responseData = await connectGet(`http://localhost:3000/histories`);
      if (!responseData.isSuccess) {
        return;
      }
      setHistoriesList(responseData.data);
      setTotalHistoriesNum(responseData.data.length);
      setPageCount(Math.ceil(responseData.data.length / displayNum));
      // 履歴情報一覧を降順にソート
      const responseHistories = responseData.data.sort((a:HistoryData, b:HistoryData) => {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
      });
      console.log(responseHistories);
      setDisplayedItems(responseHistories.slice(((page - 1) * displayNum), page * displayNum));
    }
    connectGetHistoryList();
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setDisplayedItems(historiesList.slice(((page - 1) * displayNum), page * displayNum));
  }

  return (
    <>
      <p className={classes.totalHistoriesTitle}>合計アクティビティ数</p><span className={classes.totalHistoriesNum}>{totalHistoriesNum}</span>
      <List className={classes.root}>
        {displayedItems.map((history) => (
          <ListItem>
            <ListItemAvatar>
              <img className={classes.history_img} id="img" alt="" src={`https://i.ytimg.com/vi/${history ? history.url : ""}/${history ? history.thumbnail_id : ""}`}></img>
            </ListItemAvatar>
            <ListItemText primary={`${history ? history.name : ""} × ${history ? history.set_count : ""}セット`} secondary={`${history ? convertJst(history.created_at) : ""}`} />
          </ListItem>
        ))}
        <div className={classes.history_paging}>
          <Pagination count={pageCount} page={page} onChange={handleChange}/>
        </div>
      </List>
    </>
  );
}