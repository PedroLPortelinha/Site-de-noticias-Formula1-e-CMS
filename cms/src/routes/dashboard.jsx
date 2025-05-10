import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import LastPosts from "../lastPosts";
import LastRaces from "../lastRaces";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/posts">
              <CardContent className="text-center">
                <Typography variant="h5" component="div">
                  Posts
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/races">
              <CardContent className="text-center">
                <Typography variant="h5" component="div">
                  Corridas
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <LastPosts />
        <br></br>
        <LastRaces />
      </Box>
    </Box>
  );
};

export default Dashboard;
