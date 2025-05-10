import LastPosts from "../lastPosts";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Posts() {
  return (
    <Container padding={4}>
      <Stack direction="row" padding={2} spacing={2}>
        <Typography variant="h4" component="div">
          Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/posts/new"
        >
          Novo Post
        </Button>
      </Stack>

      <LastPosts />
    </Container>
  );
}
