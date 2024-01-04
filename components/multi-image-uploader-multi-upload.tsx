'use client';
import React, { forwardRef, ReactNode, Ref, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import ImageUploader, { UploadImageProps } from './ui/image-uploader';
import { cn } from '@/lib/utils';

interface DragItemProps extends UploadImageProps {
  id: string;
  index: number;
  faded?: boolean;
  style?: React.CSSProperties;

}

const DragItem = forwardRef((props: DragItemProps, ref: Ref<HTMLDivElement>) => {

    const { id, faded, style,  ...rest } = props;

    const inlineStyles: React.CSSProperties = {
      ...style,
    };

    console.log(35, inlineStyles)
    return <ImageUploader
      ref={ref}
      style={inlineStyles}
      className='rounded-md border-none h-[200px] min-w-[200px] overflow-hidden'
      {...rest}
    />


  }
);

DragItem.displayName = 'DragItem';

interface GridProps {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div
      // className='relative'
      style={{
        display: 'flex',
        flexDirection: "row",
        gap: 5,
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        // gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr) )`,
        gridGap: 10,
      }}

      
    >
      {children}
    </div>
  );
};


interface SortablePhotoProps extends DragItemProps {
  id: string;
  index: any;
}



const SortablePhoto: React.FC<SortablePhotoProps> = (props) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id } as any)


  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DragItem
    {...props}
    {...attributes}
    {...listeners}
      ref={setNodeRef}
      style={style}
  
    />
  );
};


interface SortableGridProps {
  onChange?: (items: any[]) => void;
  defaultValue?: any[];
  getId: (item: any) => string;
  className?: string;
}

const SortableGrid: React.FC<SortableGridProps> = (props) => {
  const [items, setItems] = useState<any[]>(props?.defaultValue ?? []);
  const sensors = useSensors(useSensor(
    MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  }),
    // useSensor(PointerSensor, {
    //   activationConstraint: {
    //     distance: 8,
    //   },
    // }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
      },
    }));


  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => props?.getId?.(item) === active.id);
        const newIndex = prevItems.findIndex((item) => props?.getId?.(item) === over.id);
        let newArr = arrayMove(prevItems, oldIndex, newIndex);
        props?.onChange?.(newArr)
        return newArr
      });
    }
    // setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items?.map(item => ({ ...item, id: props?.getId?.(item)}))} strategy={rectSortingStrategy}>
        <Grid>
          {items.map((item, index) => (
            <SortablePhoto
              onChange={(value) => {
                setItems((prevItems) => {
                  // Create a copy of the previous items array to avoid mutating state directly
                  const updatedItems = [...prevItems];

                  // Check if fileId is null, and if so, remove the item from the array
                  if (!value?.fileId) {
                    updatedItems.splice(index, 1);
                  } else {
                    // Update the item with the new fileId if it's different or add a new item
                    if (updatedItems[index]?.fileId !== value?.fileId) {
                      updatedItems[index] = value;
                    }
                  }
                  props?.onChange?.(updatedItems)
                  return updatedItems;
                });
              }}
              key={item?.fileId ?? index} id={item?.fileId} index={index} defaultValue={item} />
          ))}
          <ImageUploader resetAfterUploaded={true} onChange={(value) => {
            if (value?.fileId) {
              setItems([...items, value])
              props?.onChange?.([...items, value])
            }
          }} className={cn('border border-input rounded-md h-[200px] min-w-[200px]', props?.className ?? '' )} />
        </Grid>
      </SortableContext>

    </DndContext>
  );
};

export default SortableGrid;

