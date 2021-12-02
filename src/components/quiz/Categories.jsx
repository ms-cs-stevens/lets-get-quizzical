import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from "@material-ui/core/Link";
import Container from "@mui/material/Container";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import firebase from '../../firebase/firebaseApp';
import { useSetRecoilState } from "recoil";
import state from "../../state/global"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  width: 250,
  lineHeight: '100px',
  fontWeight: '600',
  fontSize: 20,
  borderRadius: 20
}));

function Categories() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const setCurrentState = useSetRecoilState(state.currentCategoryState);
  const db = firebase.firestore();

  const handleCategorySelect = (e, categoryId) => {
    setCurrentState(categoryId);
    history.push("/quiz")
  }

  const getCategories = async () => {
    setLoading(true);
    const snapshot = await db
      .collection('categories')
      .get();
    let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(data)
    console.log(categories)
    setLoading(false)
  };

  useEffect(() => {
    getCategories();
  }, [])

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container maxWidth="md">
      <h2>Select Your Category</h2>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        {categories.map((category, index) => (
          <Grid item xs={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: 2,
                }}
              >

                  <Item
                    style={{cursor: "pointer" }}
                    onClick={(e) => handleCategorySelect(e, category.id)}
                    key={index} elevation={3}>
                      {category.label}
                  </Item>
              </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Categories;