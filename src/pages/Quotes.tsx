// pages/QuotesPage.tsx
import { useEffect } from "react";
import { Box, Pagination, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuotes, fetchQuotesCount } from "../store/quote/thunks";
import { QuoteCard } from "../components/QuoteCard";
import { GridBackGroundLayout } from "../ui/GridBackGroundLayout";


export const QuotesPage = () => {
  const dispatch = useAppDispatch();

  const { quotes, offset, limit, total } = useAppSelector((state) => state.quotes);

  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchQuotes({ offset: offset, limit: limit }));
    dispatch(fetchQuotesCount());
  }, [dispatch]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newOffset = (value - 1) * limit;

    dispatch(fetchQuotes({ offset: newOffset, limit }));
  };

  return (
    <GridBackGroundLayout>
      <Stack
        spacing={3}
        alignItems="center"
        sx={{ width: "100%", py: 4, mt: 10}}
      >
        {quotes.map((quote, index) => (
          <QuoteCard key={index} quote={quote} />
        ))}

        <Box mt={2}>
          <Pagination
            page={page}
            count={pageCount}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </GridBackGroundLayout>
  );
};
