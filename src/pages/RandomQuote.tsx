import { useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRandomQuote } from "../store/quote/thunks";
import { QuoteCard } from "../components/QuoteCard";
import { GridBackGroundLayout } from "../ui/GridBackGroundLayout";

export const RandomQuotePage = () => {
  const dispatch = useAppDispatch();

  const randomQuote = useAppSelector((state) => state.quotes.randomQuote);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <GridBackGroundLayout>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", py: 4 }}
      >
        {randomQuote && <QuoteCard quote={randomQuote} />}

        <Button variant="contained" onClick={handleRefresh}>
          Удиви меня.
        </Button>
      </Stack>
    </GridBackGroundLayout>
  );
};
