import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import firebase from '../../firebase/firebaseApp';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: 100,
  lineHeight: '100px',
  fontWeight: 'bold',
  fontSize: 18,
  borderRadius: 20
}));

function Categories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const db = firebase.firestore();

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
    <Container size="small">
      <h2>Select Your Category</h2>
      <Grid container spacing={2}>
          <Grid item xs={6}>
            {categories.map((category, index) => (
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <Item key={index} elevation={3}>
                  {category.label}
                </Item>
              </Box>
            ))}
          </Grid>
      </Grid>
    </Container>
  );
}

export default Categories;