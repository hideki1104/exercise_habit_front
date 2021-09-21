import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { connectPost, connectPatch } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  }),
);

interface PostFormProps {
}

export const PostForm: React.FC<PostFormProps> = () => {
  const classes = useStyles();

  return (
    <>
      <h1>投稿画面</h1>
    </>
  );
}