// import { Box } from "@mui/material";
// import { useState } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   DropResult,
//   Draggable,
// } from "react-beautiful-dnd";
// // import Draggable from "react-draggable"; // The default

// const DragAndDropContainer = () => {
//   const listItems = [
//     {
//       id: "1",
//       name: "Breakfast",
//     },
//     {
//       id: "2",
//       name: "Lunch",
//     },
//     {
//       id: "3",
//       name: "Dinner",
//     },
//     {
//       id: "4",
//       name: "Snack",
//     },
//   ];

//   const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
//     padding: 10,
//     margin: `0 50px 15px 50`,
//     background: isDragging ? "#4a2975" : "white",
//     color: isDragging ? "white" : "black",
//     border: `1px solid black`,
//     fontSize: `20px`,
//     borderRadius: `5px`,

//     ...draggableStyle,
//   });

//   const [meals, setMeals] = useState(listItems);
//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const items = Array.from(meals);
//     const [newOrder] = items.splice(source.index, 1);
//     items.splice(destination.index, 0, newOrder);

//     setMeals(items);
//   };

//   return (
//     <Box>
//       <h1>Drag and Drop</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="meals">
//           {(provided) => (
//             <div
//               className="todo"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {meals.map(({ id, name }, index) => {
//                 return (
//                   <Draggable key={id} draggableId={id} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={getItemStyle(
//                           snapshot.isDragging,
//                           provided.draggableProps.style
//                         )}
//                       >
//                         {name}
//                       </div>
//                     )}
//                   </Draggable>
//                 );
//               })}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </Box>
//   );
// };

// export default DragAndDropContainer;

import {DndContext, closestCenter} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {Box} from '@mui/material';
import {useState} from 'react';
import SortableItems from './SortableItems';

const DragAndDropContainer = () => {
  const [languages, setLanguages] = useState(['JavaScript', 'Python', 'TypeScript']);

  const handleDragEnd = (event: any) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      setLanguages((items: any) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box sx={{marginTop: 10}}>
        <h1>The best programming languages!</h1>
        <SortableContext items={languages} strategy={verticalListSortingStrategy}>
          {languages.map((language) => (
            <SortableItems key={language} id={language} />
          ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default DragAndDropContainer;
