import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import  IconButton  from '@mui/material/IconButton';
import  CardMedia  from '@mui/material/CardMedia';
import  CardHeader  from '@mui/material/CardHeader';
import ListMenu from '../components/List-Menu';
import CustomDialog from './custom-dialog';
import EditQuiz from './edit-quiz';



export default function QuizCard() {
  const [openEditCard, setOpenEditCard] = React.useState(false)

  const handleChangeEditCard = () => {
    setOpenEditCard(!openEditCard);
  }
  return (
    <Card sx={{ maxWidth: 345 }}
        
      >
      <CardHeader
       action={
        <IconButton aria-label="settings">
            <ListMenu handleChangeEditCard={handleChangeEditCard}></ListMenu>
        </IconButton>
      }
        title="Name"
        subheader="Theme,Status"
      />
     
      <CardMedia
        component="img"
        height="194"
        image="https://th.bing.com/th/id/R.33d02c67b4a6e90abe2d7a58f764edd8?rik=gA%2fesQP2%2f0%2b5uw&riu=http%3a%2f%2fwww.snut.fr%2fwp-content%2fuploads%2f2015%2f12%2fimage-de-nature-9.jpg&ehk=4oiNLekZZh50XowVszovQmq8w%2fH0S6GIwQYqeKknWaM%3d&risl=&pid=ImgRaw&r=0"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        
       <CustomDialog open={openEditCard} >
          <EditQuiz handleChangeEditCard={handleChangeEditCard}></EditQuiz>
        </CustomDialog>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}
