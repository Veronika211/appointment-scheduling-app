import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Typography } from "@mui/material";

const SortableItems = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>{props.id}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SortableItems;
