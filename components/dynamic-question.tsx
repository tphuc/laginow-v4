import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus, Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const DynamicQuestion = ({ defaultValue, onChange }) => {
  const [options, setOptions] = useState(defaultValue || []);

  const handleAddOption = () => {
    setOptions([...options, { title: '', isTrue: false }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleTitleChange = (index, title) => {
    const updatedOptions = [...options];
    updatedOptions[index].title = title;
    setOptions(updatedOptions);
    onChange(updatedOptions);
  };
  const handleIsTrueChange = (index, isChecked) => {
    const updatedOptions = [...options];
    updatedOptions[index].isTrue = isChecked;
    setOptions(updatedOptions);
    onChange(updatedOptions);
  };



  return (
    <div className='space-y-1'>
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-1">
          <Input
            type="text"
            className='h-9'
            value={option.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            placeholder="Tên lựa chọn"
          
          />
           <label className="inline-flex items-center">
           <Checkbox
            checked={option.isTrue}
             className='w-8 h-8'
            onCheckedChange={(isChecked: boolean) => handleIsTrueChange(index, isChecked)}
          />
          </label>
         
          <Button
            onClick={() => handleRemoveOption(index)}
            size={'sm'}
            className='rounded-sm border p-2'
            variant={'destructive'}
          >
            <Trash className='w-4 h-4'/>
          </Button>
        </div>
      ))}
      <Button
        onClick={handleAddOption}
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
