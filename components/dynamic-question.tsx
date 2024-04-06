// DynamicQuestion.js
import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Plus, Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const DynamicQuestion = ({ defaultValue, onChange }) => {
  const [options, setOptions] = useState(defaultValue || []);
  console.log('defaultValue', defaultValue)

  const handleAddOption = (addCallback) => {
    const newOptions = [...options, { title: '', isTrue: false }];
    setOptions(newOptions);
    addCallback(newOptions);
  };

  const handleRemoveOption = (index, removeCallback) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    removeCallback(updatedOptions.filter(option => option.title !== '')); // Filter options with non-empty titles
  };

  const handleTitleChange = (index, title, changeCallback) => {
    const updatedOptions = [...options];
    updatedOptions[index].title = title;
    setOptions(updatedOptions);
    changeCallback(updatedOptions.filter(option => option.title !== '')); // Filter options with non-empty titles
  };

  const handleIsTrueChange = (index, isChecked, changeCallback) => {
    const updatedOptions = [...options];
    updatedOptions[index].isTrue = isChecked;
    setOptions(updatedOptions);
    changeCallback(updatedOptions);
  };

  return (
    <div className='space-y-1'>
      {options?.map?.((option, index) => (
        <div key={index} className="flex items-center gap-1">
          <Input
            type="text"
            className='h-9'
            value={option.title}
            onChange={(e) => handleTitleChange(index, e.target.value, onChange)}
            placeholder="Tên lựa chọn"
          />
          <label className="inline-flex items-center">
            <Checkbox
              checked={option.isTrue}
              className='w-8 h-8'
            
              onCheckedChange={(isChecked) => handleIsTrueChange(index, isChecked, onChange)}
            />
          </label>
          <Button
          type='button'
            onClick={() => handleRemoveOption(index, onChange)}
            size={'sm'}
            className='rounded-sm border p-2'
            variant={'destructive'}
          >
            <Trash className='w-4 h-4'/>
          </Button>
        </div>
      ))}
      <Button
        type='button'
        onClick={() => handleAddOption(onChange)}
        className='gap-2 rounded-sm w-full'
        size={'sm'}
        variant={'outline'}
      >
        <Plus className='w-4 h-4'/>
        Thêm lựa chọn
      </Button>
    </div>
  );
};

export default DynamicQuestion;
