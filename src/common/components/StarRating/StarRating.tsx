import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {FC} from "react"
import { CardGradeType } from 'features/cards/cards.types';


type Props = {
  value: CardGradeType
  handleStarRating: (value: CardGradeType) => void
}

export const StarRating: FC<Props> = ({ value, handleStarRating }) => {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        defaultValue={0}
        value={value}
        onChange={(event, newValue) => {
          handleStarRating(newValue as CardGradeType)
        }}
      />
    </Box>
  );
}