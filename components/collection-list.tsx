import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Trash } from 'lucide-react';

const CollectionList = ({ defaultValue, onChange }) => {
  const [items, setItems] = useState(defaultValue);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
      onChange([...items, inputValue.trim()]);
    }
  };

  const handleEditItem = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;
    setItems(updatedItems);
    onChange(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <div className='space-y-1'>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className='flex items-center gap-2'>
              <Input
                type="text"
                value={item}
                onChange={(e) => handleEditItem(index, e.target.value)}
              />
              <Button
                type='button'
                onClick={() => handleRemoveItem(index)}
                size={'sm'}
                className='rounded-sm border p-2'
                variant={'destructive'}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className='space-y-2'>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder=""
        />
        <Button className='gap-1' variant={'outline'} size='sm' onClick={handleAddItem}> <Plus className='w-4 h-4'/> Thêm</Button>
      </div>
    </div>
  );
};

export default CollectionList;
