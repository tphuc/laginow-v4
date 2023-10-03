import { ReactNode } from "react";
import { Button } from "./button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationBarProps { 
    onClickPrevious?: Function;
    onClickNext?: Function;
    children?: ReactNode;
}


export default function PaginationBar({ onClickNext, onClickPrevious, children }: PaginationBarProps){
    return <div className="flex gap-4 items-center">
    <Button onClick={() => {
            onClickPrevious?.()
                
        }} variant={'outline'} size='sm' className="gap-2">
      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
    </Button>
    <p>{children}</p>
    <Button onClick={() => {
           onClickNext?.()
        }} variant={'outline'} size='sm' className="gap-2">
      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
    </Button>
  </div>
}