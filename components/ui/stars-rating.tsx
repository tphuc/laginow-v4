import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";



function StarRating({ defaultValue, onChange, changeable=false }: { defaultValue?: any; onChange?: any, changeable?: boolean}) {
  const [rating, setRating] = useState(defaultValue);

  const handleStarClick = (newRating) => {
    if(changeable){
      setRating(newRating);
      onChange?.(newRating);
    }
  };

  useEffect(() => {
    if(defaultValue >= 0)
      setRating(defaultValue)
  }, [defaultValue])

  return <div className="flex stroke-indigo-700 items-center">
    {
      [1, 2, 3, 4, 5].map((number) => (
        <Star className={cn(`w-5 h-5 cursor-pointer `,  number > rating ? '#eee' : 'fill-indigo-600')} stroke='inherit' key={number} strokeWidth={1} onClick={() => handleStarClick(number)} />
      ))
    }
  </div>;
}

export default StarRating;