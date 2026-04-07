import { Card, CardContent, Typography, Box } from "@mui/material";
import type { Quote } from "../entities/quote/type";

export const QuoteCard = ({ quote }: { quote: Quote }) => {
  return (
    <Card
      sx={{
        width: "50%",
        minHeight: 150,
        backgroundColor: "background.paper",
        display: "flex",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Typography
          variant="body1"
          sx={{
            color: "text.primary",
            mb: 2,
            wordBreak: "break-word",
          }}
        >
          {quote.quoteText}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="secondary">
            {quote.username}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {new Date(quote.creationDate).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
