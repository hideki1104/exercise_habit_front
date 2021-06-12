import React from 'react'

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Post
          </Typography>
          <Typography variant="h6">
          </Typography>
          { isAuthenticated ? logInNav : guestNav }
        </Toolbar>
      </AppBar>
    </div>
  );
}