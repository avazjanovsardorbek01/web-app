import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

function NewsDetailPage() {
  const { id } = useParams();
  const title = decodeURIComponent(id || "");

  return (
    <>
      <Typography variant="h5">Детали новости</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        (Подробная информация по заголовку: {title})
      </Typography>
    </>
  );
}

export default NewsDetailPage;
