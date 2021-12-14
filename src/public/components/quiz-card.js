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
import { styled } from "@mui/system";

const StyledCardMedia = styled(CardMedia)({
  "objectFit": "contain",
  "background": 'beige',
})
export default function QuizCard({quiz}) {
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
        title={quiz?.name}
        subheader="Theme,Status"
      />
     
      <StyledCardMedia
        component="img"
        height="194"
        image={quiz?.image}
        alt="quiz image"
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
