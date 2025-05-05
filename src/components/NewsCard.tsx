import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewsCard({ article }: { article: any }) {
  const navigate = useNavigate();
  const id = encodeURIComponent(article.title);

  return (
    <Card onClick={() => navigate(`/news/${id}`)}>
      <CardActionArea>
        {article.urlToImage && (
          <CardMedia
            component="img"
            height="350"
            width={50}
            image={article.urlToImage}
            alt={article.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description?.substring(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewsCard;
