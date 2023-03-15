import {DndContext, closestCenter} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {Box} from '@mui/material';
import {useState} from 'react';
import {SortableItems} from './SortableItems';

export const DragAndDropContainer = () => {
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
